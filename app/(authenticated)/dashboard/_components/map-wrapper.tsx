"use client"
import React, { useMemo } from "react"
import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

export function MapWrapper() {
	const Map = useMemo(
		() =>
			dynamic(() => import("./map-component"), {
				loading: () => (
					<div className="flex items-center justify-center h-full">
						<Loader2 className="w-6 h-6 animate-spin mr-2" />
						<p>Map is loading</p>
					</div>
				),
				ssr: false,
			}),
		[]
	)

	return (
		<div className=" h-full">
			<Map zoom={6} position={[51.505, -0.09]} />
		</div>
	)
}
