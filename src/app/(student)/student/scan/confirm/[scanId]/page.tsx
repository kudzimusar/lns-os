import React from 'react'
import ScanConfirmationClient from './ScanConfirmationClient'

export async function generateStaticParams() {
  return [
    { scanId: 'scan-001' },       // attendance demo
    { scanId: 'scan-math-7a' },
    { scanId: 'scan-eng-7a' },
    { scanId: 'scan-sci-8b' },
  ]
}

export default function ScanConfirmationPage({ params }: { params: { scanId: string } }) {
  return <ScanConfirmationClient params={params} />
}
