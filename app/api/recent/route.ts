import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
	try {
		const user = await getCurrentUser()
		if (!user) {
			return new NextResponse("Unauthorized", { status: 401 })
		}
		const allQuakes = await db.quakeLocation.findMany({
			orderBy: {
				updated: "desc",
			},
		})

		// Convert BigInt to string for serialization
		const serializedRecords = allQuakes.map((record) => ({
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
		}))

		return NextResponse.json(serializedRecords)
	} catch (error: any) {
		console.log(error)
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}
