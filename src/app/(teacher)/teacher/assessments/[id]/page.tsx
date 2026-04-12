import React from "react";
import AssessmentClient from "./AssessmentClient";

export function generateStaticParams() {
  return [{ id: '1' }];
}

export default async function AssessmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  return <AssessmentClient id={id} />;
}
