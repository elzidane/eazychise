import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/dashboard'

  const source = searchParams.get('source')

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser()
      const role = user?.user_metadata?.role
      
      let finalNext = next

      if (!role) {
        if (source === 'login') {
          await supabase.auth.signOut()
          finalNext = '/masuk?error=not_registered'
        } else {
          finalNext = '/onboarding'
        }
      } else {
        finalNext = '/dashboard'
      }

      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${finalNext}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${finalNext}`)
      } else {
        return NextResponse.redirect(`${origin}${finalNext}`)
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
