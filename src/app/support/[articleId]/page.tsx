import React from "react";
import SupportArticleClient from "./SupportArticleClient";

const ARTICLES = [
  { id: 'scan-attendance', title: 'Synchronizing Classroom Attendance', category: 'Tutorial', time: '5 min read' },
];

export async function generateStaticParams() {
  return ARTICLES.map(a => ({ articleId: a.id }));
}

export default function SupportArticlePage({ params }: { params: { articleId: string } }) {
  return <SupportArticleClient params={params} />;
}
