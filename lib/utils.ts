import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
	return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function constructMetadata({
	title = "QuakeWatch Pro",
	description = "Your Real-Time Gateway to Global Earthquake Data for Informed Decision-Making",
	image = "",
	icons = "/favicon.ico",
	noIndex = false,
}: {
	title?: string
	description?: string
	image?: string
	icons?: string
	noIndex?: boolean
} = {}): Metadata {
	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: [
				{
					url: image,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [image],
			creator: "@kevinminh",
		},
		icons,
		metadataBase: new URL("https://quakewatch.io"),
		...(noIndex && {
			robots: {
				index: false,
				follow: false,
			},
		}),
	}
}
