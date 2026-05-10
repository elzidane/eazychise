import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // refreshing the auth token
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Proctecting routes
  // Jika user belum login dan mencoba mengakses rute yang dilindungi (misal /dashboard)
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    const url = request.nextUrl.clone()
    url.pathname = '/masuk'
    return NextResponse.redirect(url)
  }

  // Logika Onboarding
  if (user) {
    const role = user.user_metadata?.role;
    const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');
    const isOnboarding = request.nextUrl.pathname.startsWith('/onboarding');
    const isAuthPage = request.nextUrl.pathname.startsWith('/masuk') || request.nextUrl.pathname.startsWith('/daftar');

    if (!role && isDashboard) {
      // User belum punya role, paksa ke onboarding
      const url = request.nextUrl.clone()
      url.pathname = '/onboarding'
      return NextResponse.redirect(url)
    }

    if (role && isOnboarding) {
      // User sudah punya role, jangan biarkan akses onboarding lagi
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }

    if (isAuthPage) {
      // Jika user sudah login, redirect dari halaman masuk/daftar ke tempat yang semestinya
      const url = request.nextUrl.clone()
      url.pathname = role ? '/dashboard' : '/onboarding'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
