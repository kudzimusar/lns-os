import React from "react";
import TripBoardingScanner from "./ScannerClient";

export async function generateStaticParams() {
  return [
    { id: 'trip-001' },
    { id: 'trip-002' },
    { id: 'trip-003' },
    { id: 'trip-004' },
    { id: 'trip-005' },
  ];
}

export default function ScannerPage({ params }: { params: { id: string } }) {
  return <TripBoardingScanner id={params.id} />;
}
