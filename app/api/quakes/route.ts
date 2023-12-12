import { db } from "@/lib/db"
import { EarthquakeData } from "@/types"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
	try {
		const res = await fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson")

		if (!res.ok) {
			return new NextResponse("Internal Server Error", { status: 500 })
		}

		const data: EarthquakeData = await res.json()
		console.log(data)

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
				const createdData = await db.quakeLocation.create({
					data: {
						id: feature.id,
						mag: properties.mag,
						place: properties.place,
						time: BigInt(properties.time),
						updated: BigInt(properties.updated),
						url: properties.url,
						detail: properties.detail,
						felt: properties.felt ?? null,
						cdi: properties.cdi ?? null,
						mmi: properties.mmi ?? null,
						alert: properties.alert ?? null,
						status: properties.status,
						tsunami: properties.tsunami,
						sig: properties.sig,
						net: properties.net,
						code: properties.code,
						ids: properties.ids,
						sources: properties.sources,
						types: properties.types,
						nst: properties.nst ?? null,
						dmin: properties.dmin ?? null,
						rms: properties.rms,
						gap: properties.gap ?? null,
						magType: properties.magType,
						type: properties.type,
						title: properties.title,
						longitude: geometry[0],
						latitude: geometry[1],
					},
				})
				console.log(createdData)
			}
		}

		// Return existing records
		const existingRecords = await db.quakeLocation.findMany({
			orderBy: {
				time: "desc",
			},
		})

		return NextResponse.json(existingRecords)
	} catch (error: any) {
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}
