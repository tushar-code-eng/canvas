import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

interface CustomUser {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email
                token.image = user.image
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                const user = session.user as CustomUser;
                user.id = typeof token.id === 'string' ? token.id : '';
                user.email = typeof token.email === 'string' ? token.email : null;
                user.image = typeof token.image === 'string' ? token.image : null;
                user.name = typeof token.name === 'string' ? token.name : null;

                await fetch(`${process.env.BACKEND_URL}/api/saveUser`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(session.user),
                }).catch((error) => console.error("Error sending user to backend:", error));

            }

            return session;
        },
    },
});

export { handler as GET, handler as POST }; // Required for Next.js App Router
