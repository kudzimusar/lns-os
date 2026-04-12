import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import ParentReportClient from "./ParentReportClient";

export async function generateStaticParams() {
  return PLACEHOLDER_STUDENTS.map((s) => ({
    studentId: s.id,
  }));
}

export default function ParentStudentReportPage({ params }: { params: { studentId: string } }) {
  return <ParentReportClient params={params} />;
}
