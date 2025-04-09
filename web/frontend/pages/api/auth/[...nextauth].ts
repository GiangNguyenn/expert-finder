/**
 * referenced from https://next-auth.js.org/
 */

import NextAuth, { Session } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import jwt_decode from "jwt-decode";
import { getHost } from "../service/[...path]";
import { ServiceName } from "../../../core/types";

export default NextAuth({
  
  providers: [
    CredentialProvider({
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const payload = {
          email: credentials?.email,
          password: credentials?.password,
        };
        const response = await fetch(`${getHost(ServiceName.AUTH)}/auth/login`, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const user = await response.json(); // Specify the type as 'User'
        
        if (!response.ok) {
          throw new Error(user.detail);
        }

        if (response.ok && user) {
          return user;
        }

        return Promise.reject(new Error(user?.errors));
      },
    }),
  ],
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.token,
        };
      }

      return token;
    },

    async session({ session, token }) {
      const jwt_data: any = jwt_decode(token.accessToken!);
      session.user.email = jwt_data.data.email;
      session.user.id = jwt_data.data.id;
      session.user.name = jwt_data.data.name;

      return session;
    },
  },
  secret: process.env.JWT_SECRET,
  debug: true,
});

