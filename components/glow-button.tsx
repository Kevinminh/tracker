type GlowButtonProps = {
	text: string
}

export function GlowButton({ text }: GlowButtonProps) {
	return (
		<div className="group relative">
			<div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200" />
			<p className="relative flex items-center divide-x divide-gray-600 rounded-2xl bg-background px-4  py-2 text-sm font-medium leading-none transition duration-200">
				{text}
			</p>
		</div>
	)
}
