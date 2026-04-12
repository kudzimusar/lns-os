import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import ChildProfileClient from "./ChildProfileClient";

export async function generateStaticParams() {
  return PLACEHOLDER_STUDENTS.map((s) => ({
    studentId: s.id,
  }));
}

export default function ParChildProfilePage({ params }: { params: { studentId: string } }) {
  return <ChildProfileClient params={params} />;
}
