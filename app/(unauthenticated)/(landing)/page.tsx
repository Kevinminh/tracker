import { GlowButton } from "@/components/glow-button"
import { Particles } from "@/components/particles"
import { GithubLogo } from "@/components/svg"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default async function Home() {
	return (
		<main className="flex items-center justify-center h-screen ">
			<Particles className="pointer-events-none absolute inset-0" quantity={50} />
			<section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
				<div className="container flex max-w-[64rem] flex-col items-center gap-10 text-center">
					<div className="flex flex-col items-center gap-4">
						<GlowButton text="🎉 Try for free!" />
						<h1 className="text-3xl font-medium sm:text-5xl md:text-6xl lg:text-7xl">
							Quake
							<span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
								Watch
							</span>{" "}
							Pro
						</h1>
						<p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
							Your Real-Time Gateway to Global Earthquake Data for informed Decision-Making
						</p>
					</div>
					<div className="flex flex-col items-center justify-center gap-y-2">
						<Link href={"/sign-in"} className={cn(buttonVariants({ variant: "default", className: "w-56 h-12" }))}>
							Get started
						</Link>
						<div className="flex items-center text-muted-foreground">
							<p>Made with love</p>
							<Link href="https://github.com/Kevinminh/tracker" target="_blank">
								<GithubLogo className="w-4 h-4 ml-2" />
							</Link>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}
