import { QuakeEmailTemplate } from "@/components/quake-email-template"
import { db } from "@/lib/db"
import { resend } from "@/lib/resend"
import { getCurrentUser } from "@/lib/session"
import { EarthquakeData } from "@/types"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
	try {
		const user = await getCurrentUser()
		if (!user) {
			return new NextResponse("Unauthorized", { status: 401 })
		}

		const dbUser = await db.user.findUnique({
			where: {
				id: user.id,
			},
			select: {
				emailSubscribed: true,
			},
		})

		if (!dbUser) {
			return new NextResponse("Unauthorized", { status: 401 })
		}

		// TODO PARSE THIS DATA
		const apiUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson"
		const res = await fetch(apiUrl)

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
						longitude: geometry[0],
						latitude: geometry[1],
					},
				})

				// Return existing records
				const existingRecords = await db.quakeLocation.findMany({
					orderBy: {
						time: "desc",
					},
					include: {
						favorites: true,
					},
				})

				// Convert BigInt to string for serialization
				const serializedRecords = existingRecords.map((record) => ({
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

				// Sends email to user ONLY IF SUBSCRIBED
				if (dbUser.emailSubscribed) {
					await resend.emails.send({
						from: "noreply@tsker.io",
						to: user.email!,
						subject: `New Earthquake in ${properties.place}`,
						react: QuakeEmailTemplate({
							email: user.email!,
							link: properties.url,
							location: properties.place,
						}) as React.ReactElement,
					})
				}

				return NextResponse.json(serializedRecords)
			}
		}

		// Return existing records
		const existingRecords = await db.quakeLocation.findMany({
			orderBy: {
				time: "desc",
			},
			include: {
				favorites: true,
			},
		})

		// Convert BigInt to string for serialization
		const serializedRecords = existingRecords.map((record) => ({
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
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}
