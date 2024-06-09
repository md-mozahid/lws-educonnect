import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserModel } from "./models/user-model";
import bcrypt from "bcryptjs";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials === null) return null;

        try {
          const user = await UserModel.findOne({ email: credentials?.email });

          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isMatch) {
              return user;
            } else {
              console.error("password mismatch");
              throw new Error("Check your password");
            }
          } else {
            console.error("User not found");
            throw new Error("User not found");
          }
        } catch (error) {
          console.error(err);
          throw new Error(err);
        }
      },
    }),
  ],
});
