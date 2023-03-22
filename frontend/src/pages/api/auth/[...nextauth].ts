import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  secret: process.env.NextAuth_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET || '',
    }),

    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET || '',
    }),

    CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          username: { label: "Email", type: "text", placeholder: "example@mail.com" },
          password: {  label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          
          // Call the graphql endpoint to create a client
          const res = await fetch("/your/endpoint", {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          })
          const user = await res.json()
    
          // If no error and we have user data, return it
          if (res.ok && user) {
            return user
          }
          // Return null if user data could not be retrieved
          return null
        }
      })
    // ...add more providers here
  ],

  callbacks: {
    // signIn: (user, account, profile)=> {
    //   // Do something when the user signs in
    //   return true;
    // },
    // async redirect(url, baseUrl) {
    //   // Do something when the user is redirected after signing in
    //   return url.startsWith(baseUrl) ? url : baseUrl;
    // },
  },

  // pages:{
  //   signIn: '/login'
  // }
}

export default NextAuth(authOptions)