import { EMSC_API_URL } from "@/constants/api-url"
import { db } from "@/lib/db"
import { EarthQuakeDataEurope } from "@/types"
import { NextResponse } from "next/server"

async function getExistingRecords() {
	const existingRecords = await db.testLocationEurope.findMany({
		orderBy: {
			time: "desc",
		},
	})
	// We need to map this because the BigInt type is not supported by the JSON serializer (TIME AND UPDATED)
	return existingRecords.map((record) => ({
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
}

export async function GET(req: Request) {
	try {
		// TODO PARSE THIS DATA
		const res = await fetch(EMSC_API_URL)
		if (!res.ok) {
			return new NextResponse("Internal Error", { status: 500 })
		}

		// const data: EarthQuakeDataEurope = await res.json()

		// // Check if feature already exists in db
		// for (const feature of data.features) {
		// 	const existingRecord = await db.testLocationEurope.findUnique({
		// 		where: {
		// 			id: feature.id,
		// 		},
		// 	})
		// 	// If the record does not exists, create it
		// 	// TODO: Consider using patch operation instead // Features can be large {db.$transaction}
		// 	if (!existingRecord) {
		// 		const properties = feature.properties

		// 		await db.testLocationEurope.create({
		// 			data: {
		// 				id: feature.id,
		// 				mag: properties.mag,
		// 				place: properties.flynn_region,
		// 				time: new Date(properties.time), // This is recieved as date string
		// 				updated: new Date(properties.lastupdate), // This is recived as date string
		// 				felt: null,
		// 				cdi: null,
		// 				magType: properties.magtype,
		// 				title: properties.flynn_region,
		// 				longitude: properties.lat, // Will always be long and lat | 2 objects
		// 				latitude: properties.lon,
		// 			},
		// 		})

		// 		// Convert BigInt to string for serialization
		// 		const serializedRecords = await getExistingRecords()
		// 		// TODO: Uncomment when testing is finished

		// 		// const dbUsers = await db.user.findMany({
		// 		// 	where: {
		// 		// 		emailSubscribed: true,
		// 		// 	},
		// 		// 	select: {
		// 		// 		email: true,
		// 		// 	},
		// 		// })
		// 		// const emails = dbUsers.map((user) => user.email)
		// 		// // Sends email to user ONLY IF SUBSCRIBED
		// 		// await resend.emails.send({
		// 		// 	from: "noreply@tsker.io", // Using my own domain to send emails
		// 		// 	to: emails as string[],
		// 		// 	subject: `New Earthquake in ${properties.place}`,
		// 		// 	react: QuakeEmailTemplate({
		// 		// 		link: properties.url,
		// 		// 		location: properties.place,
		// 		// 	}) as React.ReactElement,
		// 		// })

		// 		return NextResponse.json(serializedRecords)
		// 	}
		// }

		const europeData = await db.testLocationEurope.findMany({})

		return NextResponse.json(europeData)
	} catch (error: any) {
		console.log(error)
		return new NextResponse("Internal Error", { status: 500 })
	}
}
