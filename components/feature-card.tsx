"use client"

import React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Spotlight, SpotlightCard } from "@/components/spotlight"

type FeatureCardProps = {
	title: string
	desc: string
	children?: React.ReactNode
}

export function FeatureCard({ title, desc, children }: FeatureCardProps) {
	return (
		<Spotlight>
			<SpotlightCard>
				<Card className="overflow-hidden  transition ">
					<CardHeader>
						<CardTitle className="mb-2">{title}</CardTitle>
						<CardDescription className="text-base">{desc}</CardDescription>
					</CardHeader>
					{/* <CardContent className=" flex items-end justify-center  ">
						<div className="h-40 w-full rounded-tl-md bg-muted-foreground/10">{children}</div>
					</CardContent> */}
				</Card>
			</SpotlightCard>
		</Spotlight>
	)
}
