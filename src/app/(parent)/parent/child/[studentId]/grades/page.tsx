import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import ChildGradesClient from "./ChildGradesClient";

export async function generateStaticParams() {
  return PLACEHOLDER_STUDENTS.map((s) => ({
    studentId: s.id,
  }));
}

export default function ParChildGradesPage({ params }: { params: { studentId: string } }) {
  return <ChildGradesClient params={params} />;
}
