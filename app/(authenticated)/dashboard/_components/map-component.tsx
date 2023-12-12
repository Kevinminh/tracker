"use client"
import * as React from "react"

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet"
import { LatLngExpression, LatLngTuple } from "leaflet"
import { QuakeLocation } from "@prisma/client"

type MapComponentProps = {
	initPosition: LatLngExpression
	zoom: number
	earthQuakes: QuakeLocation[]
}

export default function MapComponent({ initPosition, zoom, earthQuakes }: MapComponentProps) {
	const positions = earthQuakes.map((quake) => [quake.latitude, quake.longitude] as LatLngTuple)
	if (!earthQuakes.length) {
		return <p>Loading...</p>
	}

	return (
		<MapContainer center={initPosition} zoom={zoom} scrollWheelZoom={false} className="w-[100%] h-[100%]">
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{earthQuakes.map((earthquake, index) => (
				<Marker key={index} position={positions[index]}>
					<Popup>
						<h2>{earthquake.title}</h2>
						<p>ID: {earthquake.id}</p>
						<p>Magnitude: {earthquake.mag}</p>
						<p>Place: {earthquake.place}</p>
						{/* Add more information here */}
					</Popup>
				</Marker>
			))}
		</MapContainer>
	)
}
