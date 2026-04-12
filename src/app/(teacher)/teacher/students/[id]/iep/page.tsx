import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import IEPClient from "./IEPClient";

export async function generateStaticParams() {
  return PLACEHOLDER_STUDENTS.map((s) => ({
    id: s.id,
  }));
}

export default function TeacherStudentIEPPage({ params }: { params: { id: string } }) {
  return <IEPClient params={params} />;
}
