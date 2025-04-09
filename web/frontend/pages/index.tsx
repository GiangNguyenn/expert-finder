import Head from 'next/head'
import { Page } from '../components/Page'
import { useSession } from 'next-auth/react'
import SignOutButton from '../components/SignOutButton'
import { useEffect } from 'react'
import router from 'next/router'
import Layout from '../components/Layout';

export default function Home() {
  const { data: session } = useSession()
  useEffect(() => {
    // redirect to /login if not signed in
    if (!session) {
      router.push('/login')
    }
  }, [session]);


  return (<>
    <Layout title="Expert Finder">
      <Page />
    </Layout>
  </>
  )
}
