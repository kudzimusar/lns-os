import React from "react";
import TicketClient from "./TicketClient";

export async function generateStaticParams() {
  return [
    { id: "TK-77421" },
    { id: "TK-77422" },
  ];
}

export default function SupportTicketDetailPage({ params }: { params: { id: string } }) {
  return <TicketClient params={params} />;
}
