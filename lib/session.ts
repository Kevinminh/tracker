import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"

export async function getCurrentUser() {
	const session = await getServerSession(authOptions)
	return session?.user
}
