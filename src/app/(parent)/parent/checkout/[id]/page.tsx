import React from "react";
import CheckoutClient from "./CheckoutClient";

const ITEMS = [
  { id: 'trip-001' },
  { id: 'fee-001' },
  { id: 'shop-001' },
  { id: 'all' }
];

export async function generateStaticParams() {
  return ITEMS.map(item => ({ id: item.id }));
}

export default function CheckoutPage({ params }: { params: { id: string } }) {
  return <CheckoutClient params={params} />;
}
