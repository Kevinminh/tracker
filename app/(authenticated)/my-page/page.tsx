import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { User } from "@prisma/client"
import { redirect } from "next/navigation"
import React from "react"

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
	const user = await getCurrentUser()
	if (!user) {
		return redirect("/sign-in")
	}

	const data = await getFavorites(user.id)
	console.log(data)

	return (
		<div className="container h-full py-4">
			<div className="border-border border rounded-md p-4">
				<p className="font-medium">Favorites</p>

				<div className="h-44 flex items-center justify-center">
					{!data.length ? (
						<div>You have no favorites yet.</div>
					) : (
						<div>
							<div>
								{data.map((favorite) => (
									<p key={favorite.id}>{favorite.id}</p>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
