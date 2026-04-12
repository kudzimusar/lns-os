import React from "react";
import PassportVerificationClient from "./PassportVerificationClient";

export async function generateStaticParams() {
  return [
    { id: 'passport-001' },
    { id: 'passport-002' },
    { id: 'passport-003' },
    { id: 'passport-004' },
    { id: 'passport-005' },
  ];
}

export default function PassportVerificationPage({ params }: { params: { id: string } }) {
  return <PassportVerificationClient />;
}
