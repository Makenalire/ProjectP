import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
export const authOptions = {
  // Configure authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "example@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        const { email, password } = credentials;
        const client = await clientPromise;
        const db = client.db("auth");
        const user = await db.collection("users").findOne({ email });
        if (!user || user.password !== password) {
          throw new Error("Incorrect email or password");
        }
        return user;

      },
    }),
  ],

  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.user = user._id;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send id properties from a provider to the client.
      session.user.id = token.user;
      
      return session;
    }
  }
};
export default NextAuth(authOptions);
