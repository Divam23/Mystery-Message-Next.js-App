import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Section,
} from "@react-email/components";
import * as React from "react";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmails({username, otp}:VerificationEmailProps){
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Text style={heading}>Hello {username},</Text>
          <Text style={text}>
            Your One-Time Password (OTP) for verification is:
          </Text>
          <Section style={otpBox}>
            <Text style={otpStyle}>{otp}</Text>
          </Section>
          <Text style={footer}>
            This OTP will expire in 10 minutes. If you did not request this,
            please ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main: React.CSSProperties = {
  backgroundColor: "#f4f4f4",
  padding: "40px 0",
};

const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "30px",
  borderRadius: "8px",
  maxWidth: "480px",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
};

const heading: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "20px",
};

const text: React.CSSProperties = {
  fontSize: "16px",
  margin: "10px 0",
  color: "#333",
};

const otpBox: React.CSSProperties = {
  textAlign: "center",
  padding: "14px",
  backgroundColor: "#f0f0f0",
  borderRadius: "6px",
  margin: "20px 0",
};

const otpStyle: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: "bold",
  letterSpacing: "6px",
  color: "#1a1a1a",
};

const footer: React.CSSProperties = {
  fontSize: "14px",
  color: "#888",
  marginTop: "20px",
};

