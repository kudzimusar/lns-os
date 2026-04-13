import React, { Suspense } from "react";
import { ASSIGNMENTS } from "@/lib/placeholder-data";
import TeacherMarkingClient from "./TeacherMarkingClient";
import { Skeleton } from "@/components/ui/Skeleton";

export async function generateStaticParams() {
  return ASSIGNMENTS.map((a) => ({
    id: a.id,
  }));
}

export default function TeacherMarkingPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<Skeleton className="h-screen w-full" />}>
      <TeacherMarkingClient params={params} />
    </Suspense>
  );
}
