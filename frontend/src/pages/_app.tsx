import '@/styles/globals.css'
import '@/styles/index.css'
import 'flowbite'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }: AppProps) {
  return(
    <SessionProvider session={pageProps.session} basePath="http://localhost:3004">
      <Component {...pageProps} />
    </SessionProvider>
  )
}
