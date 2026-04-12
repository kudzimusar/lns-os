import React from "react";
import { ASSIGNMENTS } from "@/lib/placeholder-data";
import AssignmentFeedbackClient from "./AssignmentFeedbackClient";

export async function generateStaticParams() {
  return ASSIGNMENTS.filter(a => a.status === 'Completed').map((asg) => ({
    id: asg.id,
  }));
}

export default function AssignmentFeedbackPage({ params }: { params: { id: string } }) {
  return <AssignmentFeedbackClient params={params} />;
}
