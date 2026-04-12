import React from "react";
import { ASSIGNMENTS } from "@/lib/placeholder-data";
import TeacherAssignmentSubmissionsClient from "./TeacherAssignmentSubmissionsClient";

export async function generateStaticParams() {
  return ASSIGNMENTS.map((a) => ({
    id: a.id,
  }));
}

export default function TeacherSubmissionsPage({ params }: { params: { id: string } }) {
  return <TeacherAssignmentSubmissionsClient params={params} />;
}
