import { db } from "@/lib/db"
import { getCurrentSession } from "@/lib/session"
import { NextResponse } from "next/server"
import { z } from "zod"

const routeBody = z.object({
	isSubscribed: z.boolean(),
})

export async function PATCH(req: Request) {
	try {
		const session = await getCurrentSession()
		if (!session) {
			return new NextResponse("Unauthorized", { status: 401 })
		}

		const json = await req.json()
		const body = routeBody.parse(json)

		await db.user.update({
			where: {
				id: session.id,
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
