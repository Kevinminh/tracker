import { FeatureCard } from "@/components/feature-card"
import { GlowButton } from "@/components/glow-button"
import { Particles } from "@/components/particles"
import { GithubLogo } from "@/components/svg"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default async function Home() {
	return (
		<main className="flex flex-col  h-screen ">
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
			<section id="features" className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
				<div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
					<h2 className="font-heading text-xl leading-[1.1] sm:text-2xl md:text-4xl">Features</h2>
					{/* <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
						Feature-Rich Functionality for Peak Efficiency: Advanced Task Management, Automated Billing, Secure Document
						Storage, and Robust Client Interaction Made Simple
					</p> */}
				</div>

				<div className="mx-auto grid justify-center gap-5 sm:grid-cols-2 md:max-w-[64rem]">
					<FeatureCard
						title="Track Earthquakes"
						desc="Uncover real-time global seismic insights to stay informed and make proactive decisions. Explore the latest earthquake data."
					/>
					<FeatureCard
						title="Set favorite locations"
						desc="Customize your alerts by saving preferred locations, ensuring you receive relevant earthquake updates where it matters most."
					/>
					<FeatureCard
						title="Email notifications"
						desc="Get instant email alerts for new earthquakes in your selected areas, keeping you in the loop and ready to respond."
					/>
					<FeatureCard
						title="More to come..."
						desc="Our commitment to continuous improvement means exciting features are on the horizon. Stay tuned for more or join our discord server!"
					/>
				</div>
			</section>
		</main>
	)
}
