import React from "react";
import TeacherClassDetailClient from "./TeacherClassDetailClient";

const COHORTS = [
  { id: '10a-eng' }, { id: '10b-eng' }, { id: '11a-comm' },
];

export async function generateStaticParams() {
  return COHORTS.map((c) => ({
    id: c.id,
  }));
}

export default function TeacherClassDetailPage({ params }: { params: { id: string } }) {
  return <TeacherClassDetailClient params={params} />;
}
