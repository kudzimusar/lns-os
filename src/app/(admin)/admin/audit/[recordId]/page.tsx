import React from "react";
import AdminAuditClient from "./AdminAuditClient";

export async function generateStaticParams() {
  return [
    { recordId: 'rec-88220' },
    { recordId: 'rec-88221' },
    { recordId: 'rec-88222' },
  ];
}

export default function AdminAuditPage({ params }: { params: { recordId: string } }) {
  return <AdminAuditClient params={params} />;
}
