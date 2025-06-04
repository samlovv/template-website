import { AuthOptions } from "next-auth";
/* import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcrypt" */
import {prisma} from "./prisma";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import {PrismaAdapter} from '@next-auth/prisma-adapter'


export const authOptions:AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        /* CredentialsProvider({
            name: "Credentials",
            credentials:{
                email: {label: "Email", type: "email"},
                password: {label: "password", type: "password"}, 
            },
            async authorize(credentials){
                if (!credentials?.email || !credentials?.password) return null

                const user = await prisma.user.findUnique({
                    where: {email: credentials.email}
                });

                if (!user) return null;

                const isValid = await bcrypt.compare(credentials.password, user.password)
                if (!isValid) return null;

                return {
                    id: String(user.id), // <--- фикс
                    email: user.email,
                    name: user.name,
                };

            }
        }) */
        Github({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    events: {
        async createUser({ user }) {
            const name = user.email?.split("@")[0]?.toLowerCase() || "user"

            let nickname = ""
            let isUnique = false

            const existing = await prisma.user.findUnique({ where: { nickname: name } })
            if (!existing) {
                nickname = name
                isUnique = true
            }

            while (!isUnique) {
            const random = Math.floor(1000 + Math.random() * 9000)
            const nick = `${name}_${random}`
            const existing = await prisma.user.findUnique({ where: { nickname: nick } })
            if (!existing) {
                nickname = nick
                isUnique = true
            }
            }

            await prisma.user.update({
            where: { id: user.id },
            data: { nickname },
            })
        },
        },


    callbacks: {
        async jwt({ token, user }) {
            // Если только что вошел пользователь
            if (user) {
            const userInDb = await prisma.user.findUnique({
                where: { id: user.id },
                select: { role: true },
            });

            token.role = userInDb?.role || "USER";
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user && token.sub) {
            const userInDb = await prisma.user.findUnique({
                where: { id: token.sub },
                select: { id: true, nickname: true, role: true },
            });

            session.user.id = token.sub;
            session.user.nickname = userInDb?.nickname || "unknown";
            session.user.role = userInDb?.role || "USER";
            }

            return session;
        },
        },

        
    pages:{
        signIn: '/login'
    },
    session:{
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
}