import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import DiscordProvider from 'next-auth/providers/discord';

export const authOptions: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: { scope: process.env.DISCORD_SCOPES },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session && session.user) session.user.id = token.userId;
      return session;
    },
    async jwt({ token, user, account }) {
      if (account && account.access_token) {
        token.discordAccessToken = account.access_token;
        token.userId = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
