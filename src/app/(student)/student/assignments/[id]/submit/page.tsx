import React from "react";
import { ASSIGNMENTS } from "@/lib/placeholder-data";
import AssignmentSubmissionClient from "./AssignmentSubmissionClient";

export async function generateStaticParams() {
  return ASSIGNMENTS.filter(a => a.status !== 'Completed').map((asg) => ({
    id: asg.id,
  }));
}

export default function AssignmentSubmissionPage({ params }: { params: { id: string } }) {
  return <AssignmentSubmissionClient params={params} />;
}
