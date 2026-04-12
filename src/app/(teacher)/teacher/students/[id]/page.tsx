import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import StudentProfileClient from "./StudentProfileClient";

export async function generateStaticParams() {
  return PLACEHOLDER_STUDENTS.map((s) => ({
    id: s.id,
  }));
}

export default function TeacherStudentDetailPage({ params }: { params: { id: string } }) {
  return <StudentProfileClient params={params} />;
}
