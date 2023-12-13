"use server"

import { db } from "@/lib/db"

export async function getExistingRecords() {
	const existingRecords = await db.quakeLocation.findMany({
		orderBy: {
			time: "desc",
		},
		include: {
			favorites: true,
		},
	})
	// We need to map this because the BigInt type is not supported by the JSON serializer (TIME AND UPDATED)
	return existingRecords.map((record) => ({
		id: record.id,
		mag: record.mag,
		place: record.place,
		time: Number(record.time),
		updated: Number(record.updated),
		url: record.url,
		detail: record.detail,
		felt: record.felt,
		cdi: record.cdi,
		magType: record.magType,
		type: record.type,
		title: record.title,
		longitude: record.longitude,
		latitude: record.latitude,
		favorites: record.favorites,
	}))
}
