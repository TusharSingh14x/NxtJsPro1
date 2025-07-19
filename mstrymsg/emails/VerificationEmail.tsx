import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
  Body,
  Container,
} from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Preview>Here&apos;s your verification code: {otp}</Preview>

      {/* ✅ Body wrapper is required */}
      <Body style={{ backgroundColor: '#ffffff', padding: '20px' }}>
        {/* ✅ Container is recommended */}
        <Container>
          <Section>
            <Row>
              <Heading as="h2">Hello {username},</Heading>
            </Row>
            <Row>
              <Text>
                Thank you for registering. Please use the following verification
                code to complete your registration:
              </Text>
            </Row>
            <Row>
              <Text
                style={{ fontSize: '24px', fontWeight: 'bold', margin: '16px 0' }}
              >
                {otp}
              </Text>
            </Row>
            <Row>
              <Text>If you did not request this code, please ignore this email.</Text>
            </Row>
            {/* Optional button */}
            {/* <Row>
              <Button
                href={`http://localhost:3000/verify/${username}`}
                style={{ backgroundColor: '#61dafb', color: '#fff', padding: '10px 20px' }}
              >
                Verify here
              </Button>
            </Row> */}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
