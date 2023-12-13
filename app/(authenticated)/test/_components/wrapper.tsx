"use client"

import { Icons } from "@/components/icons"
import { toast } from "@/components/ui/use-toast"
import { TestLocationEurope } from "@prisma/client"
import { useEffect, useState } from "react"

export function TestWrapper() {
	const [data, setData] = useState<TestLocationEurope[] | null>(null)

	useEffect(() => {
		async function getData() {
			const res = await fetch("/api/test")

			console.log(res)
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
		<div className="p-6 h-full">
			TEST: This page fetches data Quake data from EU updates the DB table with EuropeObject from [/api/test] - Europe
			quakes
			{data === null ? (
				<div className="h-full flex items-center justify-center">
					<Icons.spinner className="w-6 h-6 animate-spin" />
				</div>
			) : (
				data?.map((quake) => (
					<div key={quake.id} className="flex items-center gap-x-2">
						<p>{quake.title}</p>
						<p className="text-sm text-muted-foreground">id: {quake.id}</p>
					</div>
				))
			)}
		</div>
	)
}
