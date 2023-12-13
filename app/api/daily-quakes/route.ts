import { QuakeEmailTemplate } from "@/components/quake-email-template"
import { USA_QUAKE_API_URL } from "@/constants/api-url"
import { db } from "@/lib/db"
import { resend } from "@/lib/resend"
import { EarthquakeData } from "@/types"
import { getExistingRecords } from "@/utils/get-existing-records"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
	try {
		// TODO PARSE THIS DATA
		const res = await fetch(USA_QUAKE_API_URL)
		if (!res.ok) {
			return new NextResponse("Internal Server Error", { status: 500 })
		}

		const data: EarthquakeData = await res.json()

		// Check if feature already exists in db
		for (const feature of data.features) {
			const existingRecord = await db.quakeLocation.findUnique({
				where: {
					id: feature.id,
				},
			})

			// If the record does not exists, create it
			// TODO: Consider using patch operation instead // Features can be large {db.$transaction}
			if (!existingRecord) {
				const properties = feature.properties
				const geometry = feature.geometry.coordinates

				await db.quakeLocation.create({
					data: {
						id: feature.id,
						mag: properties.mag,
						place: properties.place,
						time: properties.time, // Use as number
						updated: properties.updated, // Use as number
						url: properties.url,
						detail: properties.detail,
						felt: properties.felt ?? null,
						cdi: properties.cdi ?? null,
						magType: properties.magType,
						type: properties.type,
						title: properties.title,
						longitude: geometry[0], // Will always be long and lat | 2 objects
						latitude: geometry[1],
					},
				})

				// Convert BigInt to string for serialization
				const serializedRecords = await getExistingRecords()
				const dbUsers = await db.user.findMany({
					where: {
						emailSubscribed: true,
					},
					select: {
						email: true,
					},
				})

				const emails = dbUsers.map((user) => user.email)

				// Sends email to user ONLY IF SUBSCRIBED
				// TODO: Single email per quake vs. aggregate quakes and send at a certain time?
				await resend.emails.send({
					from: "noreply@tsker.io", // Using my own domain to send emails
					to: emails as string[],
					subject: `New Earthquake in ${properties.place}`,
					react: QuakeEmailTemplate({
						link: properties.url,
						location: properties.place,
					}) as React.ReactElement,
				})

				return NextResponse.json(serializedRecords)
			}
		}
		return new NextResponse("ok", { status: 200 })
	} catch (error: any) {
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}
