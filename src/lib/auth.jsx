// Next-Auth
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { default: connectDB } = await import("@/config/MongoDB");
          const { default: User } = await import("@/models/UserSchema");
          const bcrypt = await import("bcryptjs");

          await connectDB();

          const user = await User.findOne({ email: credentials.email }).select(
            "+password"
          );

          if (!user) {
            return null;
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.userName,
            role: user.role,
          };
        } catch (error) {
          console.error("Credentials authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          console.log("Attempting Google OAuth sign in...");

          const { default: connectDB } = await import("@/config/MongoDB");
          const { default: User } = await import("@/models/UserSchema");
          const bcrypt = await import("bcryptjs");
          await connectDB();

          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            const newUser = await User.create({
              userName: user.name,
              email: user.email,
              phoneNumber: "",
              password: await bcrypt.hash(
                Math.random().toString(36).slice(-12) + "Aa1!",
                10
              ),
              provider: "google",
              providerId: account.providerAccountId,
              isEmailVerified: true,
              role: "user",
            });
            user.mongoId = newUser._id.toString();
            user.role = newUser.role;
          } else {
            if (!existingUser.providerId && account?.providerAccountId) {
              existingUser.providerId = account.providerAccountId;
              existingUser.provider = "google";
              await existingUser.save();
            }
          }

          user.mongoId = existingUser._id.toString();
          user.role = existingUser.role;

          return true;
        } catch (error) {
          console.error("=== ERROR in signIn callback ===");
          console.error("Error name:", error.name);
          console.error("Error message:", error.message);
          console.error("Full error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // First time JWT is created (sign in)
      if (user) {
        if (account?.provider === "google") {
          token.id = user.mongoId;
          token.role = user.role;
        } else {
          token.id = user.id;
          token.role = user.role;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  debug: true,
});
