import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function AuthCallBackPage() {
	const user = await getCurrentUser()
	if (!user) {
		return redirect("/sign-in")
	}

	return redirect("/dashboard")
}
