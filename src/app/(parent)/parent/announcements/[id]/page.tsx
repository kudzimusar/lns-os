import React from "react";
import AnnouncementClient from "./AnnouncementClient";

export async function generateStaticParams() {
  return [
    { id: 'ann-001' },
    { id: 'ann-002' },
    { id: 'ann-003' },
    { id: 'ann-004' },
  ];
}

export default function ParentAnnouncementDetailPage({ params }: { params: { id: string } }) {
  return <AnnouncementClient params={params} />;
}
