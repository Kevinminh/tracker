"use client"

import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"

export function TestWrapper() {
	const [data, setData] = useState(null)

	useEffect(() => {
		async function getData() {
			const res = await fetch("/api/test")
			if (!res.ok) {
				return toast({
					title: "Something went wrong",
				})
			}

			const data = await res.json()
			console.log(data)
			setData(data)
		}
		getData()
	}, [])

	return <div>TEST: This page fetches data from /api/test - Europe quakes</div>
}
