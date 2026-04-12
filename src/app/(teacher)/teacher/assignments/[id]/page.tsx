import React from "react";
import TeacherAssignmentDetailClient from "./TeacherAssignmentDetailClient";

const ASSIGNMENTS = [
  { id: '1' }, { id: '2' }, { id: '3' }, { id: '4' },
];

export async function generateStaticParams() {
  return ASSIGNMENTS.map((a) => ({
    id: a.id,
  }));
}

export default function TeacherAssignmentPage({ params }: { params: { id: string } }) {
  return <TeacherAssignmentDetailClient params={params} />;
}
