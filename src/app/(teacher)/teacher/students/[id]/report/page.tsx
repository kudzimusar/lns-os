import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import ReportClient from "./ReportClient";

export async function generateStaticParams() {
  return PLACEHOLDER_STUDENTS.map((s) => ({
    id: s.id,
  }));
}

export default function TeacherStudentReportPage({ params }: { params: { id: string } }) {
  return <ReportClient params={params} />;
}
