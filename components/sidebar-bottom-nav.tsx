import React from "react"
import { MainNavItem } from "@/types"

import { Skeleton } from "@/components/ui/skeleton"

import { cn } from "@/lib/utils"
import { UserMenu } from "./user-menu"
import { SegmentNav } from "./segment-nav"
import { getCurrentSession } from "@/lib/session"
import { redirect } from "next/navigation"

interface SidebarBottomNavProps extends React.HTMLAttributes<HTMLDivElement> {
	items?: MainNavItem[]
	dashboardUrl?: string
}

const SidebarBottomNav = async ({ items }: SidebarBottomNavProps) => {
	const session = await getCurrentSession()
	if (!session) {
		return redirect("/sign-in")
	}

	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-x-4">
				<SegmentNav items={items} />
			</div>

			<UserMenu user={{ name: session.name, image: session.image, email: session.email }} />
		</div>
	)
}

interface SidebarBottomNavSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

SidebarBottomNav.Skeleton = function SidebarBottomNavSkeleton({ className, ...props }: SidebarBottomNavSkeletonProps) {
	return (
		<div className={cn("flex items-center gap-6", className)} {...props}>
			<Skeleton className="h-4 w-[100px]" />
			<Skeleton className="h-4 w-[100px]" />
			<Skeleton className="h-10 w-10 rounded-full" />
		</div>
	)
}

export { SidebarBottomNav }
