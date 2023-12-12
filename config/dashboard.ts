import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
	mainNav: [
		{
			title: "Help",
			href: "https://docs.tsker.io",
			disabled: true,
		},
	],

	sidebarNav: [
		{
			title: "Dashboard",
			href: `/dashboard`,
			icon: "map",
		},
		{
			title: "My page",
			href: "/my-page",
			icon: "user",
		},
	],
}
