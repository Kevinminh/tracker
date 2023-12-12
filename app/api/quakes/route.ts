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

		return NextResponse.json(data)
	} catch (error: any) {
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}
