"use server"

import { db } from "@/lib/db"
import { QuakeLocation, User } from "@prisma/client"

export async function createFavorite(userId: User["id"], locationId: QuakeLocation["id"]) {
	return await db.favorite.create({
		data: {
			userId: userId,
			quakeLocationId: locationId,
			quakeLocationEuropeId: locationId,
		},
	})
}
