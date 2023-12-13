import { QuakeEmailTemplate } from "@/components/quake-email-template"
import { USA_QUAKE_API_URL } from "@/constants/api-url"
import { db } from "@/lib/db"
import { resend } from "@/lib/resend"
import { getCurrentSession } from "@/lib/session"
import { EarthquakeData } from "@/types"
import { getExistingRecords } from "@/utils/get-existing-records"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
	try {
		const session = await getCurrentSession()
		if (!session) {
			return new NextResponse("Unauthorized", { status: 401 })
		}

		const dbUser = await db.user.findUnique({
			where: {
				id: session.id,
			},
			select: {
				emailSubscribed: true,
			},
		})

		// Edge case 1) if forcefully injects a session - check if the user exists in db
		// Edge case 2) if the user still has an existing session but the DB gets deleted -- should never happen LIVE
		if (!dbUser) {
			return new NextResponse("Unauthorized", { status: 401 })
		}

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

				// Sends email to user ONLY IF SUBSCRIBED
				// The email functionality should be splitted (see the other end points)
				if (dbUser.emailSubscribed) {
					await resend.emails.send({
						from: "noreply@tsker.io",
						to: session.email!,
						subject: `New Earthquake in ${properties.place}`,
						react: QuakeEmailTemplate({
							link: properties.url,
							location: properties.place,
						}) as React.ReactElement,
					})
				}

				return NextResponse.json(serializedRecords)
			}
		}

		// Convert BigInt to string for serialization
		const serializedRecords = await getExistingRecords()

		return NextResponse.json(serializedRecords)
	} catch (error: any) {
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}
