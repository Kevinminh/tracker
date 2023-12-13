import { db } from "@/lib/db"
import { getCurrentSession } from "@/lib/session"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
	try {
		const session = await getCurrentSession()
		if (!session) {
			return new NextResponse("Unauthorized", { status: 401 })
		}

		const quakes = await db.testLocationEurope.findMany({})

		// Return the records as serialized JSON
		const serializedRecords = quakes.map((record) => ({
			id: record.id,
			mag: record.mag,
			place: record.place,
			time: Number(record.time),
			updated: Number(record.updated),
			felt: record.felt,
			cdi: record.cdi,
			magType: record.magType,
			title: record.title,
			longitude: record.longitude,
			latitude: record.latitude,
		}))

		return NextResponse.json(serializedRecords)
	} catch (error: any) {
		console.log(error)
		return new NextResponse("Internal Error", { status: 500 })
	}
}
