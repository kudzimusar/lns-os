import React from "react";
import AdminSupportTicketClient from "./AdminSupportTicketClient";

export async function generateStaticParams() {
  return [
    { ticketId: 'TKT-882' },
    { ticketId: 'TKT-881' },
    { ticketId: 'TKT-880' },
    { ticketId: 'TKT-879' },
  ];
}

export default function AdminSupportPage({ params }: { params: { ticketId: string } }) {
  return <AdminSupportTicketClient params={params} />;
}
