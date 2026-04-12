import React from "react";
import { ASSIGNMENTS } from "@/lib/placeholder-data";
import TeacherMarkingClient from "./TeacherMarkingClient";

export async function generateStaticParams() {
  return ASSIGNMENTS.map((a) => ({
    id: a.id,
  }));
}

export default function TeacherMarkingPage({ params }: { params: { id: string } }) {
  return <TeacherMarkingClient params={params} />;
}
