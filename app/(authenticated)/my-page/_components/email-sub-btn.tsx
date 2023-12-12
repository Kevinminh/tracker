"use client"

import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"

type EmailSubBtnProps = {
	isEmailSubscribed: boolean | undefined
}

export function EmailSubBtn({ isEmailSubscribed }: EmailSubBtnProps) {
	const [isSubscribed, setIsSubscribed] = useState<boolean | undefined>(isEmailSubscribed)
	const router = useRouter()

	async function handleSwitch() {
		setIsSubscribed(!isSubscribed)
		const apiUrl = "/api/email-subscription"
		const res = await fetch(apiUrl, {
			method: "PATCH",
			body: JSON.stringify({
				isSubscribed: !isSubscribed,
			}),
		})

		if (!res.ok) {
			return toast({
				title: "Something went wrong",
			})
		}

		router.refresh()
	}

	return <Switch id="airplane-mode" checked={isSubscribed} onCheckedChange={() => handleSwitch()} />
}
