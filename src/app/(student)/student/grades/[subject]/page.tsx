import React from "react";
import { SUBJECTS } from "@/lib/placeholder-data";
import SubjectGradesClient from "./SubjectGradesClient";

export async function generateStaticParams() {
  return SUBJECTS.map((sub) => ({
    subject: sub.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
  }));
}

export default function SubjectGradesPage({ params }: { params: { subject: string } }) {
  return <SubjectGradesClient params={params} />;
}
