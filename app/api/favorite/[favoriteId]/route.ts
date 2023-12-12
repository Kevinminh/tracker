import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { NextResponse } from "next/server"
import { z } from "zod"

const routeContextSchema = z.object({
	params: z.object({
		favoriteId: z.string(),
	}),
})

export async function DELETE(req: Request, context: z.infer<typeof routeContextSchema>) {
	try {
		const user = await getCurrentUser()
		if (!user) {
			return new NextResponse("Unauthorized", { status: 401 })
		}

		const { params } = routeContextSchema.parse(context)
		const { favoriteId } = params

		await db.favorite.delete({
			where: {
				id: favoriteId,
			},
		})

		return new NextResponse(null, { status: 200 })
	} catch (error: any) {
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}
