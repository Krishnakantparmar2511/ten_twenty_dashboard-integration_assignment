import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === "test@example.com" &&
          credentials?.password === "password123"
        ) {
          return {
            id: "1",
            name: "John Doe",
            email: "test@example.com",
            accessToken: "Xy0p2hv9v6mZQfS2kXOTa2tHgEJZm4wT6AnF95Xzj0o=",
          };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) token.accessToken = (user as any).accessToken;
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = { ...session.user, accessToken: token.accessToken };
      return session;
    },
  },
  pages: { signIn: "/login" },
};

const handler = (NextAuth as any)(authOptions);

export { handler as GET, handler as POST };
