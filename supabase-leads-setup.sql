-- 1. Buat Tabel Pengajuan Kemitraan (Leads)
CREATE TABLE public.partnership_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  franchise_id UUID NOT NULL REFERENCES public.franchises(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  location TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'Baru',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE public.partnership_requests ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Siapa saja (bahkan tamu) boleh submit form kemitraan
CREATE POLICY "Anyone can submit a partnership request" 
ON public.partnership_requests FOR INSERT 
TO public
WITH CHECK (true);

-- 4. Policy: Pemilik Brand hanya bisa membaca leads dari franchise miliknya
CREATE POLICY "Franchisors can view leads for their franchises" 
ON public.partnership_requests FOR SELECT 
TO authenticated
USING (
  franchise_id IN (
    SELECT id FROM public.franchises WHERE owner_id = auth.uid()
  )
);

-- 5. Policy: Pemilik Brand hanya bisa update status leads dari franchise miliknya
CREATE POLICY "Franchisors can update leads for their franchises" 
ON public.partnership_requests FOR UPDATE 
TO authenticated
USING (
  franchise_id IN (
    SELECT id FROM public.franchises WHERE owner_id = auth.uid()
  )
)
WITH CHECK (
  franchise_id IN (
    SELECT id FROM public.franchises WHERE owner_id = auth.uid()
  )
);

-- 6. Policy: Pengguna bisa melihat pengajuan mereka sendiri
CREATE POLICY "Users can view their own partnership requests" 
ON public.partnership_requests FOR SELECT 
TO authenticated
USING (user_id = auth.uid());
