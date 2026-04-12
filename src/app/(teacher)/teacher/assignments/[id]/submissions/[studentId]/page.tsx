import React from "react";
import { ASSIGNMENTS, PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import TeacherMarkingSubmissionsClient from "./TeacherMarkingSubmissionsClient";

export async function generateStaticParams() {
  const params: { id: string, studentId: string }[] = [];
  ASSIGNMENTS.forEach(a => {
    PLACEHOLDER_STUDENTS.forEach(s => {
      params.push({ id: a.id, studentId: s.id });
    });
  });
  return params;
}

export default function TeacherSubmissionPage({ params }: { params: { id: string, studentId: string } }) {
  return <TeacherMarkingSubmissionsClient params={params} />;
}
