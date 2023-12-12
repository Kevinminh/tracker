"use client"

import { useEffect } from "react"

export function LandingWrapper() {
	async function test() {
		const res = await fetch("/api/xohan")

		console.log(res)

		const data = await res.json()
		console.log(data)
	}

	useEffect(() => {
		test()
	}, [])

	return <div>LandingWrapper</div>
}
