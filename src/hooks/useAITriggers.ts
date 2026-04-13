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
        // Predictive: flag students with ≥2 late marks before a 3rd absence occurs.
        // In production this history comes from the DB; here it is mocked per student id.
        const LATENESS_RISK_THRESHOLD = 2;
        const mockLatenessHistory: Record<string, number> = {
          '3': 2, // Catherine Great — 2 late incidents this week
          '1': 1,
        };

        const atRiskStudent = data.find((s: any) => {
          const lateCount = mockLatenessHistory[s.id] ?? 0;
          // Predict risk when lateness pattern is present but absence not yet confirmed
          return lateCount >= LATENESS_RISK_THRESHOLD && s.status !== 'A';
        });

        if (atRiskStudent) {
          const lateCount = mockLatenessHistory[atRiskStudent.id];
          const newItem: ApprovalQueueItem = {
            id: triggerId,
            type: 'PREDICTED_ABSENCE_RISK',
            severity: 'MEDIUM',
            studentName: atRiskStudent.name,
            generatedAt: new Date().toISOString(),
            status: 'DRAFT',
            content: `AI Prediction: ${atRiskStudent.name} has been late ${lateCount} times this week. Pattern analysis indicates high risk of an upcoming absence. Recommend early parent contact now — before a 3rd incident is recorded.`,
            contentType: 'alert',
            recipient: { name: 'Guardian', id: 'g1', role: 'parent' },
            aiConfidence: 'MEDIUM',
            expiresAt: new Date(Date.now() + 172800000).toISOString(),
          };
          addQueueItem(newItem);
        }
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [data, pageName, addQueueItem, pendingActions]);
};
