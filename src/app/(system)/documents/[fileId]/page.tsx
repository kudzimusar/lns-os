import React from "react";
import DocumentViewerClient from "./DocumentViewerClient";

const FILES = [
  { id: 'file-001' }, { id: 'file-002' }, { id: 'file-003' },
];

export async function generateStaticParams() {
  return FILES.map((file) => ({
    fileId: file.id,
  }));
}

export default function DocumentPage({ params }: { params: { fileId: string } }) {
  return <DocumentViewerClient params={params} />;
}
