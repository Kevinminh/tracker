import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { User } from "@prisma/client"
import { redirect } from "next/navigation"
import { FavoriteBtn } from "./_components/favorite-btn"

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

	return (
		<div className="container h-full py-4">
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
		</div>
	)
}
