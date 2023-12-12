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

type QuakeEmailTemplateProps = {
	email: string
	link: string
	location: string
}

export function QuakeEmailTemplate({ email, link, location }: QuakeEmailTemplateProps) {
	return (
		<Html>
			<Head />
			<Preview>A new earth quake has happend!</Preview>
			<Tailwind>
				<Body className="m-auto bg-white font-sans">
					<Container className="w–[465px] mx-auto my-[40px] rounded border border-solid border-border p-[20px]">
						<Heading className="mx-0 my-[30px] p-0 text-left text-[24px] font-normal text-black">
							<strong>The quake position: {location}</strong>
						</Heading>
						<Text className="text-[14px] leading-[24px]">
							<Link href={link} className="text-blue-600">
								Click here to read more
							</Link>
						</Text>
						<Text className="text-[14px] leading-[24px]">Or, copy and paste this link:</Text>
						<Section className="rounded-md border-border bg-[#d2d2d2] px-6 py-4">
							<Text className="text-[14px]">{link}</Text>
						</Section>

						<Text className="text-[14px] leading-[24px] text-muted">
							This mail is for {email}. If you wish to unsubscribe, please visit our settings page.
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
