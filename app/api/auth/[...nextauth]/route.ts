// import NextAuth from 'next-auth/next';
import NextAuth, { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { sql } from '@vercel/postgres';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },

  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log(({ token, user, account, profile, isNewUser }));
      token.test = 'custom-test';
      return token;
    },
    async session({ session, user, token }) {
      (session as {test:string} & Session).test = (token.test as string);
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      // name: 'Credentials',
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {
        //getting user response
        const response = await sql`
          SELECT * FROM users WHERE email=${credentials?.email};
        `;

        const {headers} = req;
        console.log('request', {headers});

        console.log('response', {response});

        const user = response.rows[0];

        const isPasswordCorrect = await compare(
          credentials?.password || '',
          user.password
        );

        console.log({ isPasswordCorrect });

        if (isPasswordCorrect) {
          const { id, email } = user || {};
          return { id, email };
        }

        console.log({ credentials });

        return null;

        /** * /
        ----creds: {
          credentials: {
            email: 'user1@test.io',
            password: 'asdf1234',
            redirect: 'false',
            csrfToken: '306976cfbc50bb02c3818f9760c8f2ce39c0f289cb4ab6f68e959b71c09dd61d',
            callbackUrl: 'http://localhost:3000/login',
            json: 'true'
          }
        }
        /** */
      }
    })
  ]
});

export { handler as GET, handler as POST };
