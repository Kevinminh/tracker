import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"

export async function getCurrentSession() {
	const session = await getServerSession(authOptions)
	return session?.user
}
