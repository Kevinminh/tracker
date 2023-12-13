import { getCurrentSession } from "@/lib/session"
import { MapWrapper } from "./_components/map-wrapper"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
	const session = await getCurrentSession()

	if (!session) {
		return redirect("/sign-in")
	}

	return (
		<div className="h-full">
			<MapWrapper userId={session.id} />
		</div>
	)
}
