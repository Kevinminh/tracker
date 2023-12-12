"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { SidebarNavItem } from "@/types"

interface SidebarDashboardProps {
	items: SidebarNavItem[]
}

export function SidebarDashboard({ items }: SidebarDashboardProps) {
	const [tasks, setTasks] = useState<number | null>(null)
	const path = usePathname()

	return (
		<div className="grid items-start gap-[1px]">
			{items.map((item, index) => {
				const Icon = Icons[item.icon || "arrowRight"]

				return (
					item.title && (
						<Link key={index} href={"/"}>
							<span
								className={cn(
									"group relative flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium transition hover:bg-muted/40 hover:text-accent-foreground hover:opacity-100",
									{
										"cursor-not-allowed opacity-70": item.disabled,
										"bg-muted/80 hover:bg-muted/80 ": path === item.href || path.includes(item.title.toLowerCase()),
									}
								)}
							>
								<Icon
									className={cn("mr-2 h-4 w-4 text-muted-foreground/60 group-hover:text-muted-foreground/70", {
										"text-foreground group-hover:text-foreground":
											path === item.href || path.includes(item.title.toLowerCase()),
									})}
								/>
								<span>{item.title}</span>

								{item.title === "Taskboard" && tasks ? (
									<span className="absolute right-3 top-2 flex h-6 w-6 items-center justify-center rounded-md bg-primary text-xs text-white opacity-100">
										{tasks}
									</span>
								) : null}
							</span>
						</Link>
					)
				)
			})}
		</div>
	)
}
