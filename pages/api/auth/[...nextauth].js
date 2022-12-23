import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import OneLoginProvider from "next-auth/providers/onelogin";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // OneLoginProvider({
    //   clientId: process.env.ONELOGIN_CLIENT_ID,
    //   clientSecret: process.env.ONELOGIN_CLIENT_SECRET,
    //   issuer: process.env.ONELOGIN_ISSUER,
    // }),
    // ...add more providers here
  ],
  // pages: {
  //   singIn: "/",
  // },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
