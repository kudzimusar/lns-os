import React from "react";
import TeacherTripDetailClient from "./TeacherTripDetailClient";

const TRIPS = [
  { id: 'trip-001' },
];

export async function generateStaticParams() {
  return TRIPS.map(t => ({ id: t.id }));
}

export default function TeacherTripPage({ params }: { params: { id: string } }) {
  return <TeacherTripDetailClient params={params} />;
}
