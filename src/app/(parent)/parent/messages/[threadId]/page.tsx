import React from "react";
import ParentMessagesPage from "../page";
import { MESSAGE_THREADS } from "@/lib/placeholder-data";

export async function generateStaticParams() {
  return MESSAGE_THREADS.map((thread) => ({
    threadId: thread.id,
  }));
}

export default function ParentMessageThreadPage({ params }: { params: { threadId: string } }) {
  return <ParentMessagesPage />;
}
