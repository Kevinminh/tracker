"use client"

import React, { useState } from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { userAuthSchema } from "@/app/(unauthenticated)/(auth)/_components/schema"
import { Loader2 } from "lucide-react"
import { GithubLogo, GoogleSVG } from "@/components/svg"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(userAuthSchema),
	})

	const [isLoading, setIsLoading] = useState<boolean>(false)
	// const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false)
	const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
	const searchparams = useSearchParams()
	const originFrom = searchparams?.get("from")

	const redirectUrl = originFrom !== null ? originFrom : `/auth-callback`

	const onSubmit = async (data: FormData) => {
		setIsLoading(true)

		const signInResult = await signIn("email", {
			email: data.email.toLowerCase(),
			redirect: false,
			callbackUrl: redirectUrl,
		})

		setIsLoading(false)

		if (signInResult?.error) {
			return toast({
				title: "Something went wrong.",
				description: "Your sign in request failed. Please try again.",
				variant: "destructive",
			})
		}

		return toast({
			title: "Check your email",
			description: "We sent you a login link. Be sure to check your spam too.",
		})
	}

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid gap-2">
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="email">
							Email
						</Label>
						<Input
							id="email"
							placeholder="name@example.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							disabled={isLoading}
							{...register("email")}
						/>
					</div>
					{errors?.email && <p className="px-1 text-xs text-red-600">{errors.email.message}</p>}

					<Button disabled={isLoading}>Sign In with Email</Button>
				</div>
			</form>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">Or continue with</span>
				</div>
			</div>

			<Button
				onClick={() => {
					setIsGoogleLoading(true), signIn("google", { callbackUrl: redirectUrl })
				}}
				type="button"
				variant="outline"
				disabled={isLoading || isGoogleLoading}
			>
				{isGoogleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleSVG className="mr-2 h-4 w-4" />}
				Google
			</Button>

			{/* <Button
				type="button"
				variant="outline"
				onClick={() => {
					setIsGithubLoading(true), signIn("github", { callbackUrl: redirectUrl })
				}}
				disabled={isLoading || isGithubLoading}
			>
				{isGithubLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GithubLogo className="mr-2 h-4 w-4" />}
				Github
			</Button> */}
		</div>
	)
}
