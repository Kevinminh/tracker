import { getCurrentUser } from "@/lib/session"
import { MapWrapper } from "./_components/map-wrapper"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
	const user = await getCurrentUser()

	if (!user) {
		return redirect("/sign-in")
	}

	return (
		<div className="h-full">
			<MapWrapper userId={user.id} />
		</div>
	)
}
