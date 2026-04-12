import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import ChildBehaviourClient from "./ChildBehaviourClient";

export async function generateStaticParams() {
  return PLACEHOLDER_STUDENTS.map((s) => ({
    studentId: s.id,
  }));
}

export default function ParChildBehaviourPage({ params }: { params: { studentId: string } }) {
  return <ChildBehaviourClient params={params} />;
}
