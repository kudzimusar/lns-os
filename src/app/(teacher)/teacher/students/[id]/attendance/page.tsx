import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import AttendanceClient from "./AttendanceClient";

export async function generateStaticParams() {
  return PLACEHOLDER_STUDENTS.map((s) => ({
    id: s.id,
  }));
}

export default function TeacherStudentAttendancePage({ params }: { params: { id: string } }) {
  return <AttendanceClient params={params} />;
}
