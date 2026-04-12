import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import DocumentsClient from "./DocumentsClient";

export async function generateStaticParams() {
  return PLACEHOLDER_STUDENTS.map((s) => ({
    id: s.id,
  }));
}

export default function TeacherStudentDocumentsPage({ params }: { params: { id: string } }) {
  return <DocumentsClient params={params} />;
}
