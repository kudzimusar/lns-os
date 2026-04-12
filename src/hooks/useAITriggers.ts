'use client';

import { useEffect } from 'react';
import { useAIStore } from '@/lib/ai/store';
import { ApprovalQueueItem } from '@/types/ai';

/**
 * Hook to simulate the AI Trigger Engine detecting patterns in data.
 * In a real app, this would be an event-driven server-side system.
 */
export const useAITriggers = (data: any, pageName: string) => {
  const { addQueueItem, pendingActions } = useAIStore();

  useEffect(() => {
    if (!data) return;

    // Simulate "detecting" a pattern after 5 seconds on the page
    const timer = setTimeout(() => {
      // Avoid duplicate triggers for the same page/data
      const triggerId = `trigger-${pageName}-${new Date().toLocaleDateString()}`;
      if (pendingActions.some(item => item.id === triggerId)) return;

      if (pageName === 'Attendance') {
        // Example: Detect consecutive absence
        const absentStudent = data.find((s: any) => s.status === 'A');
        if (absentStudent) {
          const newItem: ApprovalQueueItem = {
            id: triggerId,
            type: 'CONSECUTIVE_ABSENCE',
            severity: 'HIGH',
            studentName: absentStudent.name,
            generatedAt: new Date().toISOString(),
            status: 'DRAFT',
            content: `AI Detection: ${absentStudent.name} has been absent for 3 consecutive days. Should I draft a wellness check message to the parents?`,
            contentType: 'alert',
            recipient: { name: 'Guardian', id: 'g1', role: 'parent' },
            aiConfidence: 'HIGH',
            expiresAt: new Date(Date.now() + 172800000).toISOString(),
          };
          addQueueItem(newItem);
        }
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [data, pageName, addQueueItem, pendingActions]);
};
