import React from "react";
import AdminTeacherDetailClient from "./AdminTeacherDetailClient";

const TEACHERS = [
  { id: 'TEA-001' }, { id: 'TEA-002' }, { id: 'TEA-003' },
];

export async function generateStaticParams() {
  return TEACHERS.map(t => ({ id: t.id }));
}

export default function AdminTeacherPage({ params }: { params: { id: string } }) {
  return <AdminTeacherDetailClient params={params} />;
}
