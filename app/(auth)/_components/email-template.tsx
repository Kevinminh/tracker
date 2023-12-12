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
			<Preview>Tsker magic login link</Preview>
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

							<Text className="text[12px] text-muted">Tsker.io the all-in-one consulting platform.</Text>
						</Section>

						{/* <Section>
              <Row>
                <Column align="right">
                  <Img className="rounded-full" src={invitedByImage ?? ""} width="64" height="64" />
                </Column>
                <Column align="center">
                  <Img src={RIGHT_ARROW} width="12" height="9" alt="invited you to" />
                </Column>
                <Column align="left">
                  <Img className="rounded-full" src={customerLogo} width="64" height="64" />
                </Column>
              </Row>
            </Section>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-10 py-5 text-center text-[12px] font-semibold text-white no-underline"
                href={inviteString}
              >
                Join the team
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{" "}
              <Link href={inviteString} className="text-blue-600 no-underline">
                {inviteString}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This invitation was intended for <span className="text-black">{email}</span>.This
              invite was sent from <span className="text-black">FROM IP</span> located in{" "}
              <span className="text-black">FROM LOCATION</span>. If you were not expecting this
              invitation, you can ignore this email. If you are concerned about your account&apos;s
              safety, please reply to this email to get in touch with us.
            </Text> */}
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}
