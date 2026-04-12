import React from "react";
import TeacherMessagesPage from "../page";
import { MESSAGE_THREADS } from "@/lib/placeholder-data";

export async function generateStaticParams() {
  return MESSAGE_THREADS.map((thread) => ({
    threadId: thread.id,
  }));
}

export default function TeacherMessageThreadPage({ params }: { params: { threadId: string } }) {
  return <TeacherMessagesPage params={params} />;
}
