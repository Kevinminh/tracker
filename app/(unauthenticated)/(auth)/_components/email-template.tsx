import { LOGO } from "@/constants/images"
import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Tailwind,
	Text,
} from "@react-email/components"

type MagicLinkEmailTemplateProps = {
	email: string
	magicLink: string
}

export function MagicLinkEmailTemplate({ email, magicLink }: MagicLinkEmailTemplateProps) {
	return (
		<Html>
			<Head />
			<Preview>QuakeWatcher magic login link</Preview>
			<Tailwind>
				<Body className="m-auto bg-white font-sans">
					<Container className="w–[465px] mx-auto my-[40px] rounded border border-solid border-border p-[20px]">
						<Heading className="mx-0 my-[30px] p-0 text-left text-[24px] font-normal text-black">
							<strong>Login</strong>
						</Heading>
						<Text className="text-[14px] leading-[24px]">
							<Link href={magicLink} className="text-blue-600">
								Click here to login with this magic link
							</Link>
						</Text>
						<Text className="text-[14px] leading-[24px]">Or, copy and paste this temporary login link:</Text>
						<Section className="rounded-md border-border bg-[#d2d2d2] px-6 py-4">
							<Text className="text-[14px]">{magicLink}</Text>
						</Section>

						<Text className="text-[14px] leading-[24px] text-muted">
							This mail is for {email}. If you din&apos;t try to login, you can safely ignore this email.
						</Text>

						<Section className="mt-[32px]">
							<Img src={LOGO} width="40" height="37" alt="Logo" className="my-0 rounded-full object-cover" />

							<Text className="text[12px] text-muted">QuakeWatcher PRO the best platform!</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}
