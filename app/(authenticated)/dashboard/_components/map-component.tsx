"use client"

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { LatLngTuple } from "leaflet"
import { QuakeLocation, User } from "@prisma/client"
import Link from "next/link"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { createFavorite } from "../_actions/create-favorite"
import { QuakeLocationWithFavorites } from "@/types"
import { useEffect, useState } from "react"

type MapComponentProps = {
	zoom: number
	earthQuakes: QuakeLocationWithFavorites[]
	userId: User["id"]
}

export default function MapComponent({ zoom, earthQuakes, userId }: MapComponentProps) {
	const [favoriteQuakeIds, setFavoriteQuakeIds] = useState<string[]>([])

	useEffect(() => {
		// Populate favoriteQuakeIds
		const quakeIds = earthQuakes
			.filter((quake) => quake.favorites.some((favorite) => favorite.userId === userId))
			.map((quake) => quake.id)
		setFavoriteQuakeIds(quakeIds)
	}, [earthQuakes, userId])

	const positions = earthQuakes.map((quake) => [quake.latitude, quake.longitude] as LatLngTuple)

	if (!earthQuakes.length) {
		return (
			<div className="flex h-full items-center justify-center">
				<Icons.spinner className="w-6 h-6 animate-ping" />
			</div>
		)
	}

	async function handleFavorite(locationId: QuakeLocation["id"]) {
		await createFavorite(userId, locationId)
		setFavoriteQuakeIds((prevState) => [...prevState, locationId])
	}

	return (
		<MapContainer center={positions[0]} zoom={zoom} scrollWheelZoom={true} className="w-[100%] h-[100%]">
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{earthQuakes.map((earthquake, index) => {
				const isFavorited = favoriteQuakeIds.includes(earthquake.id)

				return (
					<Marker key={index} position={positions[index]}>
						<Popup>
							<h2 className="font-medium">{earthquake.title}</h2>
							<div>
								<p>Magnitude: {earthquake.mag}</p>
								<p>{earthquake.place}</p>
								<p>{new Date(Number(earthquake.time)).toLocaleString()}</p>
								<div className="flex items-center justify-between">
									<Link
										href={earthquake.url}
										target="_blank"
										className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
									>
										Read more
										<Icons.externalLink className="w-4 h-4 ml-2" />
									</Link>
									<div className="flex items-center gap-x-2">
										<Button
											size="icon"
											variant="ghost"
											onClick={() => handleFavorite(earthquake.id)}
											className={cn("", {
												"bg-rose-500": isFavorited,
											})}
										>
											<Icons.heart className="w-4 h-4 " />
											<span className="sr-only">Favorite</span>
										</Button>
										<Button size="icon" variant="ghost">
											<Icons.externalLink className="w-4 h-4 " />
											<span className="sr-only">Favorite</span>
										</Button>
									</div>
								</div>
							</div>
						</Popup>
					</Marker>
				)
			})}
		</MapContainer>
	)
}
