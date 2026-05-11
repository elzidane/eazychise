-- ==========================================
-- EAZYCHISE PROFILES TABLE SETUP
-- ==========================================

-- 1. Create a table for public profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL PRIMARY KEY,
  full_name TEXT,
  username TEXT UNIQUE,
  bio TEXT,
  avatar_url TEXT,
  location TEXT DEFAULT 'Indonesia',
  phone TEXT,
  website TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Define Policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can manage own profile" ON public.profiles;
CREATE POLICY "Users can manage own profile" ON public.profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 4. Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, username)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. Add new columns if upgrading an existing table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS website TEXT;

-- 7. Pre-fill profiles for existing users
INSERT INTO public.profiles (id, full_name, username, created_at)
SELECT id, raw_user_meta_data->>'full_name', COALESCE(raw_user_meta_data->>'username', split_part(email, '@', 1)), created_at
FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- ==========================================
-- STORAGE SETUP (Avatars)
-- ==========================================
-- Catatan: Anda perlu membuat bucket bernama 'avatars' di menu Storage terlebih dahulu
-- dan mengaturnya menjadi PUBLIC.

-- Kebijakan Storage (jika bucket sudah ada):
-- 1. Izinkan akses publik untuk melihat avatar
-- CREATE POLICY "Avatar public access" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');

-- 2. Izinkan pengguna terautentikasi untuk mengupload avatar mereka sendiri
-- CREATE POLICY "Users can upload their own avatar" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

-- 3. Izinkan pengguna terautentikasi untuk memperbarui avatar mereka sendiri
-- CREATE POLICY "Users can update their own avatar" ON storage.objects FOR UPDATE TO authenticated WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);
