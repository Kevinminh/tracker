import { db } from "@/lib/db"
import { getCurrentSession } from "@/lib/session"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
	try {
		const session = await getCurrentSession()
		if (!session) {
			return new NextResponse("Unauthorized", { status: 401 })
		}

		const quakes = await db.quakeLocation.findMany({
			include: {
				favorites: true,
			},
		})

		// Return the records as serialized JSON
		const serializedRecords = quakes.map((record) => ({
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

		return NextResponse.json(serializedRecords)
	} catch (error: any) {
		console.log(error)
		return new NextResponse("Internal Error", { status: 500 })
	}
}
