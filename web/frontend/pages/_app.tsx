import '../styles/globals.css'
import { SessionProvider, useSession } from "next-auth/react"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from 'react-query'
import { useRouter } from 'next/router'
import { Session } from 'next-auth'

export default function App({
  Component,
  pageProps,
}: AppProps<{ session: Session }>) {
  const queryClient = new QueryClient()

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <AuthenticatedWrapper>
          <Component {...pageProps} />
        </AuthenticatedWrapper>
      </QueryClientProvider>
    </SessionProvider>
  )
}

function AuthenticatedWrapper({ children }: any) {
  const { status, data: session } = useSession()
  const router = useRouter()
  
  if (status === "loading") {
    // Show a loading indicator while the session status is being determined.
    return <div>Loading...</div>
  }

  if (status === "authenticated" || router.pathname === "/login" || router.pathname === "/signup") {
    // If the user is authenticated or visiting the login or signup page,
    // render the children.
    return children
  }

  // If the user is not authenticated and not on the login or signup page,
  // you can customize the behavior, such as redirecting to the login page.
  router.push("/login") // Redirect to the login page
  return null // Return null to prevent rendering unauthorized content
}
