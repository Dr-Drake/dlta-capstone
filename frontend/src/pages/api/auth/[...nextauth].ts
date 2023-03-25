import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient, getClient } from "@/services/clientService";
import { ClientInput } from "@/types/Client";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  secret: process.env.NextAuth_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET || '',
    }),

    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_SECRET || '',
    }),

    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET || '',
    }),

    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@mail.com" },
        password: {  label: "Password", type: "password" },
        type: { type: 'hidden' }
      },
      async authorize(credentials, req) {
        
        let payload: ClientInput = {
          email: credentials?.email || '',
          password: credentials?.password
        }
        
        // Check if it's sign up
        if (credentials?.type === 'signup') {
          
          // Create Client
          const { data, error } = await createClient(payload);
          console.log(data);

          if (data) {
            return{
              email: data.addClient.client.email,
              id: data.addClient.client.id,
              name: data.addClient.client.email,
              image: null
            }
          }

          if (error) {
            throw new Error(`${error.message}`)
          }
        }
        else{

          // Validate client
          const { data, error } = await getClient(payload);

          if (data) {
            return{
              email: data.client.client.email,
              id: data.client.client.id,
              name: data.client.client.email,
              image: null
            }
          }

          if (error) {
            throw new Error(`${error.message}`)
          }
          
        }

        return null
        
      }
    })
  ],

  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {

    //   // First check if the user exists
    //   let request: ClientInput = {
    //     email: profile?.email || '',
    //     password: process.env.NEXT_PUBLIC_OAUTH_PASSWORD
    //   }
    //   const { data, error } = await getClient(request);

    //   console.log(data);

    //   if (data) {
    //     return true;
    //   }

    //   // If user doesn't exist, try and create the user
    //   if (error) {

    //     const { data, error: createError } = await createClient(request);
    //     console.log(data);

    //     if (data) {
    //       return true
    //     }

    //     if (createError) {
    //       throw new Error(`signin-${error.message}`)
    //     }
    //   }

    //   return false;
    // },
  },

  pages:{
    signIn: '/login',
    error: '/login'
  }
}

export default NextAuth(authOptions)