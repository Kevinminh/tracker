"use client"

import { AvatarProps } from "@radix-ui/react-avatar"
import { User } from "next-auth"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons"

interface UserAvatarProps extends AvatarProps {
	user: Pick<User, "image" | "name">
	className?: string
	size?: "xs" | "sm" | "md" | "lg"
}

export function UserAvatar({ user, className, ...props }: UserAvatarProps) {
	return (
		<Avatar
			{...props}
			className={cn(
				"h-8 w-8",
				{
					"h-5 w-5": props.size === "xs",
					"h-8 w-8": props.size === "sm",
					"h-10 w-10": props.size === "md",
					"h-12 w-12": props.size === "lg",
				},
				className
			)}
		>
			{user.image ? (
				<AvatarImage
					alt="User profile picture"
					src={user.image}
					className={cn("h-full w-full rounded-full object-cover")}
				/>
			) : (
				<AvatarFallback>
					<span className="sr-only">{user.name}</span>
					<Icons.user className="h-5 w-5" />
				</AvatarFallback>
			)}
		</Avatar>
	)
}
