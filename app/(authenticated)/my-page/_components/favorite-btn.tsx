"use client"

import { ActionTooltip } from "@/components/action-tooltip"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Favorite } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

type FavoriteBtnProps = {
	favoriteId: Favorite["id"]
}

export function FavoriteBtn({ favoriteId }: FavoriteBtnProps) {
	const [isLoading, setIsloading] = useState<boolean>(false)
	const router = useRouter()

	async function onClick() {
		setIsloading(true)
		const apiUrl = `/api/favorite/${favoriteId}`
		const res = await fetch(apiUrl, {
			method: "DELETE",
		})
		setIsloading(false)

		if (!res.ok) {
			return toast({
				title: "Something went wrong",
			})
		}
		router.refresh()
	}

	return (
		<ActionTooltip label="Unfavorite">
			<Button size="icon" disabled={isLoading} variant="destructive" onClick={() => onClick()}>
				{isLoading ? <Icons.spinner className="w-4 h-4 animate-spin" /> : <Icons.heart className="w-4 h-4 " />}
				<span className="sr-only">Delete</span>
			</Button>
		</ActionTooltip>
	)
}
