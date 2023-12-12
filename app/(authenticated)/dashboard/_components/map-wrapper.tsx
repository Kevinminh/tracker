"use client"
import React, { useEffect, useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { User } from "@prisma/client"
import { QuakeLocationWithFavorites } from "@/types"

type MapWrapperProps = {
	userId: User["id"]
}

export function MapWrapper({ userId }: MapWrapperProps) {
	const [data, setData] = useState<QuakeLocationWithFavorites[]>([])

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

	useEffect(() => {
		async function getData() {
			const res = await fetch("/api/quakes")

			if (!res.ok) {
				return toast({
					title: "Something went wrong",
				})
			}
			const data = await res.json()
			setData(data)
		}
		getData()
	}, [])

	return (
		<div className=" h-full">
			<Map zoom={4} earthQuakes={data} userId={userId} />
		</div>
	)
}
