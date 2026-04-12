/**
 * Mock blockchain implementation for LNS OS
 * In a real app, this would interface with AWS QLDB and Polygon
 */

export interface BlockchainRecord {
  hash: string;
  domain: string;
  timestamp: string;
  status: 'SEALED' | 'ACTIVE' | 'SUPERSEDED' | 'ANCHORED' | 'REVOKED';
  recordId: string;
}

const MOCK_HASHES = [
  '8f3c2b1a9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b',
  'a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90',
  'f9e8d7c6b5a43210f9e8d7c6b5a43210f9e8d7c6b5a43210f9e8d7c6b5a43210',
  '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
];

export function generateMockHash() {
  return MOCK_HASHES[Math.floor(Math.random() * MOCK_HASHES.length)];
}

export async function verifyOnChain(hash: string): Promise<{
  verified: boolean;
  timestamp: string;
  domain: string;
  txHash?: string;
}> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  return {
    verified: true,
    timestamp: new Date().toISOString(),
    domain: 'STUDENT_PASSPORT',
    txHash: '0x' + generateMockHash().slice(0, 40)
  };
}

export function truncateHash(hash: string, start = 6, end = 4) {
  if (!hash) return '';
  return `${hash.slice(0, start)}...${hash.slice(-end)}`;
}
