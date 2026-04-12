import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import GradesClient from "./GradesClient";

export async function generateStaticParams() {
  return PLACEHOLDER_STUDENTS.map((s) => ({
    id: s.id,
  }));
}

export default function TeacherStudentGradesPage({ params }: { params: { id: string } }) {
  return <GradesClient params={params} />;
}
