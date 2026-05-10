'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function loginWithEmail(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function registerWithEmail(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string
  const role = formData.get('role') as string

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        role: role,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  // Jika memerlukan konfirmasi email, arahkan ke halaman verifikasi.
  // Untuk sementara kita asumsikan auto login jika konfirmasi email dimatikan,
  // atau redirect ke halaman masuk dengan pesan sukses.
  redirect('/masuk?registered=1')
}

export async function logout() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  redirect('/')
}

export async function signInWithGoogle() {
  const supabase = await createClient()
  
  // Karena kita memanggil signInWithOAuth dari server action, kita perlu mengembalikan url untuk diredirect oleh client.
  // Tapi signInWithOAuth biasanya lebih baik dipanggil dari sisi Client menggunakan supabase-browser-client.
  // Jadi untuk Google Login, lebih baik dipanggil langsung dari client component, 
  // atau kita kembalikan URL-nya.
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback`,
    },
  })

  if (data.url) {
    redirect(data.url) // Arahkan pengguna ke halaman login Google
  }
}
