import { LOGIN, NEXT_OTP } from "@/constants/endPoints";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const BASE_URL = process.env.NEXTAUTH_URL;

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // custom provider with django backend
    CredentialsProvider({
      id: "otpcustom",
      name: "OTP Custom",
      // ! check this
      credentials: {
        email: { label: "Email", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials, req) {
        // console.log("credentials=>", credentials);
        // console.log("--------credentials");
        // console.log("req=>", req)
        // console.log("--------req")
        const res = await fetch(BASE_URL + NEXT_OTP, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            otp: credentials.password,
          }),
        });
        const data = await res.json();
        // console.log("res=>", res.status);
        // console.log("data=>", data);
        // console.log("--------data");
        if (res.status === 200) {
          // send details to the client
          return { user: data };
        }
        return null;
      },
    }),
  ],
  // TODO: callbacks for jwt and session
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log("jwt=>", token);
      // console.log("user=>", user);
      if (user) {
        token = user;
        // token.exp = Math.floor(Date.now() / 1000) + 60 * 60
        // token.user = user
        // token.accessToken = user.access_token
        // token.refreshToken = user.refresh_token
        // token.jti = user.access_token
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("session=>",session)
      // console.log("token=>",token)

      session = {
        user: token.user,
        // "accessToken": token.accessToken,
        // "accessToken2": "token.accessToken",
      };
      return session;
    },
  },
  pages: {
    signIn: LOGIN,
    // signOut: "/logout",
    // error: "/error",
  },
};

export default NextAuth(authOptions);
