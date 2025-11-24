import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Text,
} from '@react-email/components';

export default function WelcomeEmail() {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'Arial, sans-serif' }}>
        <Container>
          <Heading>¡Bienvenido!</Heading>
          <Text>Gracias por registrarte en nuestra plataforma.</Text>
        </Container>
      </Body>
    </Html>
  );
}