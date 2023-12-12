import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "QuakeWatch Pro",
	description: "Real-time gateway!",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body className={cn("min-h-screen bg-background antialiased transition-all", inter.className)}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
					<Toaster />
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
