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
    //   clientId: "ae4890b0-5d34-013b-c060-0222a468834b161752",
    //   clientSecret: "5e22f8eb07cbe1bcfa2a22c6da7ec9eb3d21fe3de316d7c8c1df288a6e1347fc",
    //   issuer: "https://sparkcognition.onelogin.com",
    // }),
    // ...add more providers here
  ],
  // pages: {
  //   singIn: "/",
  // },
  // secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
