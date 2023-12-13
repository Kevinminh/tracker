import Link from "next/link"

import { cn, constructMetadata } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Particles } from "@/components/particles"
import { UserAuthForm } from "@/app/(unauthenticated)/(auth)/_components/auth-form"
import { ChevronLeft } from "lucide-react"

export const metadata = constructMetadata({
	title: "Login",
	description: "Login to your account",
})

export default function SignInPage() {
	return (
		<div className="container flex h-screen w-screen flex-col items-center justify-center">
			<Particles className="pointer-events-none absolute inset-0" quantity={50} staticity={1000} />
			<Link href="/" className={cn(buttonVariants({ variant: "ghost" }), "absolute left-4 top-4 md:left-8 md:top-8")}>
				<ChevronLeft className="mr-2 h-4 w-4" />
				Back
			</Link>
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div className="flex flex-col space-y-2 text-center">
					<span>QuakeWatch</span>
					<h1 className="text-2xl font-semibold tracking-tight">
						Welcome back
						<p className="text-sm text-muted-foreground">Enter your email to sign in to your account</p>
					</h1>
				</div>
				<UserAuthForm />
			</div>
		</div>
	)
}
