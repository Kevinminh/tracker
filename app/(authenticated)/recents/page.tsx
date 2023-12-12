import { ScrollArea } from "@/components/ui/scroll-area"
import { db } from "@/lib/db"
import React from "react"

async function getQuakes() {
	return await db.quakeLocation.findMany({
		orderBy: {
			updated: "desc",
		},
	})
}

export default async function RecentsPage() {
	const data = await getQuakes()

	return (
		<div className="h-full container py-4">
			<p className="text-lg font-medium">List of recent EarthQuakes</p>
			<ScrollArea>
				{data.map((quake) => (
					<div className="bg-card border-border rounded-md p-3 my-1.5" key={quake.id}>
						<p>{quake.title}</p>
						<p className="text-sm text-muted-foreground">{new Date(Number(quake.updated)).toLocaleString()}</p>
					</div>
				))}
			</ScrollArea>
		</div>
	)
}
