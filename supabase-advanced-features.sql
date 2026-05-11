-- =========================================================================
-- EAZYCHISE ADVANCED FEATURES SQL SETUP
-- =========================================================================

-- 1. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    franchise_id UUID REFERENCES public.franchises(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reviews" 
ON public.reviews FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert reviews" 
ON public.reviews FOR INSERT 
TO authenticated 
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can edit own reviews" 
ON public.reviews FOR UPDATE 
TO authenticated 
USING (user_id = auth.uid());


-- 2. SEARCH HISTORY TABLE
CREATE TABLE IF NOT EXISTS public.search_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    keyword TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.search_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own search history" 
ON public.search_history FOR ALL 
TO authenticated 
USING (user_id = auth.uid());


-- 3. PAGE VIEWS TABLE (Analytics)
CREATE TABLE IF NOT EXISTS public.page_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    franchise_id UUID REFERENCES public.franchises(id) ON DELETE CASCADE,
    viewer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Can be null for anonymous
    source TEXT DEFAULT 'Organic',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert page views" 
ON public.page_views FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Franchise owners can view analytics" 
ON public.page_views FOR SELECT 
TO authenticated 
USING (
  franchise_id IN (SELECT id FROM public.franchises WHERE owner_id = auth.uid())
);


-- 4. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    type TEXT DEFAULT 'system',
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view and manage own notifications" 
ON public.notifications FOR ALL 
TO authenticated 
USING (user_id = auth.uid());


-- 5. TRIGGER FOR NEW PARTNERSHIP LEADS -> NOTIFICATION
-- This function creates a notification for the brand owner whenever a new lead comes in.
CREATE OR REPLACE FUNCTION notify_brand_owner_on_lead()
RETURNS TRIGGER AS $$
DECLARE
    brand_owner_id UUID;
    brand_name TEXT;
BEGIN
    -- Get the owner of the franchise
    SELECT owner_id, name INTO brand_owner_id, brand_name
    FROM public.franchises 
    WHERE id = NEW.franchise_id;

    -- If the franchise has an owner, insert a notification
    IF brand_owner_id IS NOT NULL THEN
        INSERT INTO public.notifications (user_id, title, message, type, metadata)
        VALUES (
            brand_owner_id, 
            'Leads Baru: ' || brand_name, 
            'Ada pengajuan kemitraan baru dari ' || NEW.name || '. Segera periksa di dashboard Anda!', 
            'lead',
            jsonb_build_object(
                'lead_id', NEW.id,
                'requester_name', NEW.name,
                'franchise_name', brand_name
            )
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists
DROP TRIGGER IF EXISTS on_new_partnership_request ON public.partnership_requests;

-- Create trigger
CREATE TRIGGER on_new_partnership_request
AFTER INSERT ON public.partnership_requests
FOR EACH ROW EXECUTE FUNCTION notify_brand_owner_on_lead();

-- =========================================================================
-- ENABLE REALTIME FOR NOTIFICATIONS
-- =========================================================================
-- This allows the UI bell icon to instantly pop up without a page refresh
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
