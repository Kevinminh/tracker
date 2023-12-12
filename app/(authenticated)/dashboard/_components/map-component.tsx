"use client"
import * as React from "react"

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet"
import { LatLngExpression } from "leaflet"

type MapComponentProps = {
	position: LatLngExpression
	zoom: number
}

export default function MapComponent({ position, zoom }: MapComponentProps) {
	return (
		<MapContainer center={position} zoom={zoom} scrollWheelZoom={false} className="w-[100%] h-[100%]">
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={position}>
				{/* <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup> */}
			</Marker>
		</MapContainer>
	)
}
