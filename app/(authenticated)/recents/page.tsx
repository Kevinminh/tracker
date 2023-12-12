"use client"

import { ActionTooltip } from "@/components/action-tooltip"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { formatDateRelative } from "@/utils/date-format"
import { QuakeLocation } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
// import { db } from "@/lib/db"

// Uncomment if we want to use Server-side rendering
// async function getQuakes() {
// 	return await db.quakeLocation.findMany({
// 		orderBy: {
// 			updated: "desc",
// 		},
// 	})
// }

export default function RecentsPage() {
	const [isLoading, setIsloading] = useState<boolean>(false)
	const [data, setData] = useState<QuakeLocation[] | null>(null)
	// const data = await getQuakes() -- Uncomment if we want to use Server-side rendering

	async function getData() {
		setIsloading(true)
		const apiUrl = "/api/recent"
		const res = await fetch(apiUrl)

		setIsloading(false)
		if (!res.ok) {
			return toast({
				title: "Something went wrong",
			})
		}

		const data = await res.json()
		setData(data)
	}

	useEffect(() => {
		getData()
	}, [])

	if (data === null || isLoading) {
		return (
			<div className="h-full container py-4">
				<div className="flex items-center justify-between">
					<p className="text-lg font-medium">List of recent EarthQuakes</p>

					<Button variant="outline" disabled={isLoading}>
						Refresh
					</Button>
				</div>
				<div className="flex items-center justify-center h-full">
					<Icons.spinner className="w-6 h-6 animate-spin mr-2" />
					<p>Fetching...</p>
				</div>
			</div>
		)
	}

	return (
		<div className="h-full container py-4">
			<div className="flex items-center justify-between">
				<p className="text-lg font-medium">List of recent EarthQuakes</p>

				<Button variant="outline" disabled={isLoading} onClick={() => getData()}>
					Refresh
				</Button>
			</div>
			{data?.length ? (
				<ScrollArea className="h-[calc(100vh-8rem)] my-2">
					{data.map((quake) => (
						<div
							className="bg-card border-border rounded-md p-3 my-1.5 flex items-start justify-between"
							key={quake.id}
						>
							<div>
								<p>{quake.title}</p>
								<p className="text-sm text-muted-foreground">{new Date(Number(quake.updated)).toLocaleString()}</p>
							</div>
							<div className="flex items-center gap-x-2">
								<ActionTooltip label="Magnitude">
									<span className="text-sm select-none">{quake.mag}</span>
								</ActionTooltip>
								<ActionTooltip label={formatDateRelative(new Date(Number(quake.time)))}>
									<span
										className={cn("bg-rose-500 rounded-full w-4 h-4 p-2", {
											"bg-green-400": formatDateRelative(new Date(Number(quake.time))) === "Today",
										})}
									></span>
								</ActionTooltip>
							</div>
						</div>
					))}
				</ScrollArea>
			) : (
				<div className="flex items-center justify-center">There has been no recent Earthquakes</div>
			)}
		</div>
	)
}
