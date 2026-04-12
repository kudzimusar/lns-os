import React from "react";
import { AssignmentsLayout } from "@/components/student/AssignmentsLayout";
import { ASSIGNMENTS } from "@/lib/placeholder-data";

export async function generateStaticParams() {
  return ASSIGNMENTS.map((asg) => ({
    id: asg.id,
  }));
}

export default function AssignmentDetailPage({ params }: { params: { id: string } }) {
  return <AssignmentsLayout selectedId={params.id} />;
}
