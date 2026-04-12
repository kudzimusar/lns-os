import React from "react";
import StudentClient from "./StudentClient";

export function generateStaticParams() {
  return [{ id: '1' }];
}

export default async function StudentProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  return <StudentClient id={id} />;
}
