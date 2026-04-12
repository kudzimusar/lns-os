"use client";

import React from "react";
import StudentMessagesPage from "../page";
import { MESSAGE_THREADS } from "@/lib/placeholder-data";

export async function generateStaticParams() {
  return MESSAGE_THREADS.map((thread) => ({
    threadId: thread.id,
  }));
}

export default function MessageThreadPage({ params }: { params: { threadId: string } }) {
  return <StudentMessagesPage params={params} />;
}
