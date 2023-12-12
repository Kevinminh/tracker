"use client"
import React, { useMemo } from "react"
import MapComponent from "./_components/map"
import dynamic from "next/dynamic"

export default function DashboardPage() {
	const Map = useMemo(
		() =>
			dynamic(() => import("./_components/map"), {
				loading: () => <p>A map is loading</p>,
				ssr: false,
			}),
		[]
	)

	return (
		<div className="  h-full">
			<Map zoom={2} position={[51.505, -0.09]} />
		</div>
	)
}
