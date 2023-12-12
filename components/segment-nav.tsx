"use client"

import React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { MainNavItem } from "@/types"

import { cn } from "@/lib/utils"

interface SegmentNavProps extends React.HTMLAttributes<HTMLDivElement> {
	items?: MainNavItem[]
}

export function SegmentNav({ items }: SegmentNavProps) {
	const segment = useSelectedLayoutSegment()
	const startsWithSegment = (url: string) => {
		return url.startsWith(`/${segment}`)
	}

	return (
		<>
			{items?.length ? (
				<nav className="hidden gap-6 md:flex">
					{items?.map((item, index) => (
						<Link
							key={index}
							href={item.disabled ? "#" : item.href}
							className={cn("flex items-center text-lg font-medium transition-colors hover:opacity-90  sm:text-sm", {
								"cursor-not-allowed opacity-80": item.disabled,
								"text-foreground": startsWithSegment(item.href),
								"text-foreground/80": !startsWithSegment(item.href),
							})}
						>
							{item.title}
						</Link>
					))}
				</nav>
			) : null}
		</>
	)
}
