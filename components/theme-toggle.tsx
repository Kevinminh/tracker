"use client"

import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function ThemeToggle() {
	const { setTheme, theme } = useTheme()
	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark")
	}

	return (
		<Button
			className="flex h-fit w-fit justify-start border-0 bg-transparent px-4 py-2   text-muted-foreground transition-colors hover:text-foreground  "
			variant="outline"
			size="icon"
			onClick={() => toggleTheme()}
		>
			{theme === "light" ? (
				<Icons.moon className="mr-2 h-4 w-4 rotate-0  text-primary transition-all   " />
			) : (
				<Icons.sun className="mr-2 h-4 w-4 rotate-90  text-primary transition-all   " />
			)}
			{theme === "light" ? "Dark" : "Light"} Theme
		</Button>
	)
}
