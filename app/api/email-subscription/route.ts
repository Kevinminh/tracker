import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { NextResponse } from "next/server"
import { z } from "zod"

const routeBody = z.object({
	isSubscribed: z.boolean(),
})

export async function PATCH(req: Request) {
	try {
		const user = await getCurrentUser()
		if (!user) {
			return new NextResponse("Unauthorized", { status: 401 })
		}

		const json = await req.json()

		const body = routeBody.parse(json)
		console.log(body)

		await db.user.update({
			where: {
				id: user.id,
			},
			data: {
				emailSubscribed: body.isSubscribed,
			},
		})
		return new NextResponse(null, { status: 204 })
	} catch (error: any) {
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}
