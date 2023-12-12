"use client"

import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"

export default function SignOutPage() {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<Button onClick={() => signOut({ callbackUrl: "/" })}>Logout</Button>
		</div>
	)
}
