"use client"

import React from "react"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ActionTooltipProps {
	label: string
	children: React.ReactNode
	side?: "top" | "right" | "bottom" | "left"
	align?: "start" | "center" | "end"
	delayDuration?: number
}

export function ActionTooltip({ label, delayDuration, children, side, align }: ActionTooltipProps) {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={delayDuration ? delayDuration : 300}>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent side={side} align={align}>
					<p className="text-sm font-semibold ">{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
