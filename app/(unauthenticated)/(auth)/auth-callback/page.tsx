import { getCurrentSession } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function AuthCallBackPage() {
	const session = await getCurrentSession()
	if (!session) {
		return redirect("/sign-in")
	}

	return redirect("/dashboard")
}
