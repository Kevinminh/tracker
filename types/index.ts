import { Icons } from "@/components/icons"

type Geometry = {
	type: string
	coordinates: [number, number, number]
}

type Properties = {
	mag: number
	place: string
	time: number
	updated: number
	tz: null | string
	url: string
	detail: string
	felt: null | number
	cdi: null | number
	mmi: null | number
	alert: null | string
	status: string
	tsunami: number
	sig: number
	net: string
	code: string
	ids: string
	sources: string
	types: string
	nst: null | number
	dmin: null | number
	rms: number
	gap: null | number
	magType: string
	type: string
	title: string
}

export type Feature = {
	type: string
	properties: Properties
	geometry: Geometry
	id: string
}

type Bbox = [number, number, number, number, number, number]

type Metadata = {
	generated: number
	url: string
	title: string
	status: number
	api: string
	count: number
}

export type EarthquakeData = {
	type: string
	metadata: Metadata
	features: Feature[]
	bbox: Bbox
}

export type SidebarNavItem = {
	title: string
	disabled?: boolean
	external?: boolean
	icon?: keyof typeof Icons
} & (
	| {
			href: string
			items?: never
	  }
	| {
			href?: string
			items: any
	  }
)

export type NavItem = {
	title: string
	href: string
	disabled?: boolean
}

export type MainNavItem = NavItem

export type DashboardConfig = {
	mainNav: MainNavItem[]
	sidebarNav: SidebarNavItem[]
}
