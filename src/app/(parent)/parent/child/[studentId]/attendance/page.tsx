import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import ChildAttendanceClient from "./ChildAttendanceClient";

export async function generateStaticParams() {
  return PLACEHOLDER_STUDENTS.map((s) => ({
    studentId: s.id,
  }));
}

export default function ParChildAttendancePage({ params }: { params: { studentId: string } }) {
  return <ChildAttendanceClient params={params} />;
}
