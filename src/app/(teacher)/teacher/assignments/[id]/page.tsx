import React from "react";
import AssignmentClient from "./AssignmentClient";

export function generateStaticParams() {
  return [{ id: '1' }];
}

export default async function AssignmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  return <AssignmentClient id={id} />;
}
