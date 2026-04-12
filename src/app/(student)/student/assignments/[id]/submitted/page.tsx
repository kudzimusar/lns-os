import React from "react";
import { ASSIGNMENTS } from "@/lib/placeholder-data";
import AssignmentSubmittedClient from "./AssignmentSubmittedClient";

export async function generateStaticParams() {
  return ASSIGNMENTS.map((asg) => ({
    id: asg.id,
  }));
}

export default function AssignmentSubmittedPage({ params }: { params: { id: string } }) {
  return <AssignmentSubmittedClient params={params} />;
}
