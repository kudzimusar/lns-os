import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import BehaviourClient from "./BehaviourClient";

export async function generateStaticParams() {
  return PLACEHOLDER_STUDENTS.map((s) => ({
    id: s.id,
  }));
}

export default function TeacherStudentBehaviourPage({ params }: { params: { id: string } }) {
  return <BehaviourClient params={params} />;
}
