import React from "react";
import TeacherClassMarkbookClient from "./TeacherClassMarkbookClient";

const COHORTS = [
  { id: '10a-eng' }, { id: '10b-eng' }, { id: '11a-comm' },
];

export async function generateStaticParams() {
  return COHORTS.map((c) => ({
    id: c.id,
  }));
}

export default function TeacherClassMarkbookPage({ params }: { params: { id: string } }) {
  return <TeacherClassMarkbookClient params={params} />;
}
