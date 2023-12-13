import { db } from "@/lib/db"
import { getCurrentSession } from "@/lib/session"
import { User } from "@prisma/client"
import { redirect } from "next/navigation"
import { FavoriteBtn } from "./_components/favorite-btn"

import { EmailSubBtn } from "./_components/email-sub-btn"
import { ActionTooltip } from "@/components/action-tooltip"

async function getFavorites(userId: User["id"]) {
	return await db.favorite.findMany({
		where: {
			userId: userId,
		},
		orderBy: {
			createdAt: "desc",
		},
	})
}

export default async function MyPage() {
	const session = await getCurrentSession()
	if (!session) {
		return redirect("/sign-in")
	}

	const data = await getFavorites(session.id)

	const dbUser = await db.user.findUnique({
		where: {
			id: session.id,
		},
		select: {
			emailSubscribed: true,
		},
	})

	return (
		<div className="container h-full py-4 flex flex-col gap-y-6">
			<div className="border-border border rounded-md p-4">
				<p className="font-medium mb-3">Favorites</p>

				{!data.length ? (
					<div className="h-44 flex items-center justify-center">You have no favorites yet.</div>
				) : (
					<div className="flex flex-col space-y-2">
						{data.map((favorite) => (
							<div
								className="bg-card border border-border rounded-md p-4 flex items-start justify-between"
								key={favorite.id}
							>
								<p>{favorite.id}</p>

								<div className="flex items-center gap-x-2">
									<FavoriteBtn favoriteId={favorite.id} />
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			<div className="border border-border rounded-md p-4">
				<p className="font-medium mb-3">Settings</p>
				<div className="rounded border border-border p-3 flex items-center justify-between">
					<div className="flex items-center">
						<ActionTooltip label="Receive emails whenever a new earthquake is happening">
							<p className="select-none">Email notification</p>
						</ActionTooltip>
						<p className="text-sm ml-2 text-muted-foreground">({session.email})</p>
					</div>
					<EmailSubBtn isEmailSubscribed={dbUser?.emailSubscribed} />
				</div>
			</div>
		</div>
	)
}
