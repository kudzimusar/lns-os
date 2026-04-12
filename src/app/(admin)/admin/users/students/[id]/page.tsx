import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import AdminStudentDetailClient from "./AdminStudentDetailClient";

export async function generateStaticParams() {
  return PLACEHOLDER_STUDENTS.map(s => ({ id: s.id }));
}

export default function AdminStudentPage({ params }: { params: { id: string } }) {
  return <AdminStudentDetailClient params={params} />;
}
