"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User } from "next-auth"
import { signOut } from "next-auth/react"

import { Card } from "@/components/ui/card"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserAvatar } from "@/components/user-avatar"
import { cn } from "@/lib/utils"

interface UserMenuProps extends React.HTMLAttributes<HTMLDivElement> {
	user: Pick<User, "name" | "image" | "email">
}

export function UserMenu({ user }: UserMenuProps) {
	const path = usePathname()
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="flex items-center">
				<UserAvatar
					user={{ name: user.name || null, image: user.image || null }}
					className="h-8 w-8"
					draggable={false}
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[280px] p-2">
				<Card className="relative mb-4 flex h-36 w-full flex-col items-center justify-center gap-y-2 bg-card leading-none">
					<UserAvatar user={{ image: user.image }} size="lg" />
					<div className="flex flex-col items-center">
						{user.name && <p className="text-sm font-medium">{user.name}</p>}
						{user.email && <p className=" truncate text-xs text-muted-foreground">{user.email}</p>}
					</div>
				</Card>

				<DropdownMenuSeparator />
				<div className="flex items-center justify-between">
					<ThemeToggle />
					<DropdownMenuItem
						className="  cursor-pointer px-4 py-2   text-orange-600 transition-colors hover:text-orange-500 dark:hover:text-orange-500"
						onSelect={(event) => {
							event.preventDefault()
							signOut({
								callbackUrl: `${window.location.origin}/sign-in`,
							})
						}}
					>
						Log Out
						<Icons.power className="ml-2 h-4 w-4 text-destructive" />
					</DropdownMenuItem>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
