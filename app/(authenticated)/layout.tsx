import React, { Suspense } from "react"

import { dashboardConfig } from "@/config/dashboard"

import "@/styles/scrollbar.css"

import { SidebarBottomNav } from "@/components/sidebar-bottom-nav"
import { SidebarDashboard } from "@/components/sidebar-dashboard"
import { Toaster } from "@/components/ui/toaster"

type DashboardLayoutProps = {
	children: React.ReactNode
	params: {
		customerName: string
	}
}

export default function DashboardLayout({ children, params }: DashboardLayoutProps) {
	const customerName = params.customerName

	return (
		<div className="flex min-h-screen flex-col bg-sidebar">
			<div className=" grid flex-1 gap-12 md:grid-cols-[190px_1fr] lg:grid-cols-[240px_1fr] xl:grid-cols-[240px_1fr]  ">
				<aside className="hidden flex-col space-y-4 overflow-hidden  bg-sidebar p-3 py-4 pr-0.5 md:flex md:w-[240px] lg:w-[290px] xl:w-[290px]">
					<div className="flex h-full flex-col justify-between">
						<nav className="flex flex-col space-y-5">
							<SidebarDashboard items={dashboardConfig.sidebarNav} />
						</nav>

						<Suspense fallback={<SidebarBottomNav.Skeleton />}>
							<SidebarBottomNav items={dashboardConfig.mainNav} dashboardUrl={customerName} />
						</Suspense>
					</div>
				</aside>
				<main className="flex max-h-screen w-full flex-1 flex-col overflow-hidden  pb-1.5 pl-3 pr-1.5 pt-3 ">
					<div className=" overflow-auto rounded-lg border border-border bg-background h-full">
						<Toaster />
						{children}
					</div>
				</main>
			</div>
		</div>
	)
}
