import '@/styles/globals.css'
import '@/styles/index.css'
import 'flowbite'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import apolloClient from '@/config/apollo-client';
import { ApolloProvider } from '@apollo/client'
import { SearchContextProvider } from '@/contexts/SearchContext';

export default function App({ Component, pageProps }: AppProps) {
  return(
    <SessionProvider session={pageProps.session} basePath="http://localhost:3004/api/auth">
      <ApolloProvider client={apolloClient}>
       <SearchContextProvider>
        <Component {...pageProps} />
       </SearchContextProvider>
      </ApolloProvider>
    </SessionProvider>
  )
}
