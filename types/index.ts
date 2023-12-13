import { Icons } from "@/components/icons"
import { Favorite, QuakeLocation } from "@prisma/client"

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

type PropertiesEurope = {
	mag: number
	flynn_region: string
	time: string
	lastupdate: string
	tz: null | string
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
	magtype: string
	title: string
}

export type Feature = {
	type: string
	properties: Properties
	geometry: Geometry
	id: string
}

export type FeatureEurope = {
	type: string
	properties: PropertiesEurope
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

export type EarthQuakeDataEurope = {
	type: string
	metadata: Metadata
	features: FeatureEurope[]
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

export type QuakeLocationWithFavorites = QuakeLocation & {
	favorites: Favorite[]
}
