import React from "react"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { renderAsync } from "@react-email/render"
import { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import { db } from "@/lib/db"
import { resend } from "@/lib/resend"
import { MagicLinkEmailTemplate } from "@/app/(unauthenticated)/(auth)/_components/email-template"

export const authOptions: NextAuthOptions = {
	// huh any! I know.
	// This is a temporary fix for prisma client.
	// @see https://github.com/prisma/prisma/issues/16117
	adapter: PrismaAdapter(db as any),
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: `/sign-in`,
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_SECRET!,
		}),
		EmailProvider({
			sendVerificationRequest: async ({ identifier, url, provider }) => {
				const user = await db.user.findUnique({
					where: {
						email: identifier,
					},
					select: {
						emailVerified: true,
					},
				})

				const isUserVerified = user?.emailVerified

				const html = await renderAsync(
					MagicLinkEmailTemplate({
						email: identifier,
						magicLink: url,
					}) as React.ReactElement
				)

				if (isUserVerified) {
					const result = await resend.emails.send({
						from: "noreply@tsker.io",
						to: identifier,
						subject: "You have been invited to join QuakeWatcher!",
						html: html,
					})
					if (result.error) {
						throw new Error(result.error.message)
					}
				}

				const result = await resend.emails.send({
					from: "noreply@tsker.io",
					to: identifier,
					subject: "You have been invited to join QuakeWatcher!",
					react: MagicLinkEmailTemplate({
						email: identifier,
						magicLink: url,
					}) as React.ReactElement,
				})

				if (result.error) {
					throw new Error(result.error.message)
				}
			},
		}),
	],
	callbacks: {
		async session({ token, session }) {
			if (token) {
				session.user.id = token.id
				session.user.name = token.name
				session.user.email = token.email
				session.user.image = token.picture
			}

			return session
		},
		async jwt({ token, user }) {
			const dbUser = await db.user.findFirst({
				where: {
					email: token.email,
				},
			})

			if (!dbUser) {
				if (user) {
					token.id = user?.id
				}
				return token
			}

			return {
				id: dbUser.id,
				name: dbUser.name,
				email: dbUser.email,
				picture: dbUser.image,
			}
		},
	},
}
