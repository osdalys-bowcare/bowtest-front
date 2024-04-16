import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth/jwt" {
  interface JWT {
      provider: string;
      idToken: string;
      accessToken: string;
      username: string;
  }
}

declare module 'next-auth' {
  interface User {
      idToken?: string;
      username?: string;
  }

  interface Profile {
      username?: string;
  }

  interface Session {
      user: User;
  }
}

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async session({ session, token }: any) {
            // Adding the token to the session object so it's available in the client           
            if (token) {
                session.user.idToken = token.idToken;
                session.user.profile = token.profile;
            }
            //console.log('Session:', session)
            return session;
        },
        async jwt({ token, account, profile, user }: any) {
            if (account) {
                token.accessToken = account.access_token!
                token.idToken = account.id_token!
            }

            if (profile) {
                token.profile = profile;
            }
            //sessionStorage.setItem('token', token.idToken)
            return token;
        },
        
    },
    debug: true,
}


export default NextAuth(authOptions)
