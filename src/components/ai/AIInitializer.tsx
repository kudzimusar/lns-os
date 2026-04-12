'use client';

import React, { useEffect } from 'react';
import { useAIStore } from '@/lib/ai/store';
import { UserRole, ApprovalQueueItem } from '@/types/ai';
import { usePathname } from 'next/navigation';

interface Props {
  role: UserRole;
}

export const AIInitializer: React.FC<Props> = ({ role }) => {
  const { setUserRole, setPageContext, addQueueItem, pendingActions } = useAIStore();
  const pathname = usePathname();

  useEffect(() => {
    setUserRole(role);
    
    // Set initial page context
    setPageContext({
      user: {
        id: 'u123',
        role: role,
        name: 'Demo User',
        language: 'en'
      },
      page: {
        route: pathname,
        title: document.title,
        description: 'Auto-detected context'
      },
      pageData: {},
      school: {
        name: 'Lennon Nash Academy',
        gradingSystem: [],
        citizenshipScale: [],
        currentTerm: 'Term 3',
        currentWeek: 8
      },
      task: {
        type: 'insight',
        instruction: 'General analysis',
        outputFormat: 'text'
      }
    });

    // Seed mock data if queue is empty
    if (pendingActions.length === 0) {
      const mockItems: ApprovalQueueItem[] = [
        {
          id: 'q1',
          type: 'CONSECUTIVE_ABSENCE',
          severity: 'HIGH',
          studentName: 'Amara Johnson',
          generatedAt: new Date(Date.now() - 120000).toISOString(),
          status: 'DRAFT',
          content: "Dear Mrs. Johnson, We are reaching out regarding Amara's attendance this week. She has been absent for 3 consecutive days. Is everything okay?",
          contentType: 'alert',
          recipient: { name: 'Mrs. Johnson', role: 'parent', id: 'p1' },
          aiConfidence: 'HIGH',
          expiresAt: new Date(Date.now() + 172800000).toISOString()
        },
        {
          id: 'q2',
          type: 'GRADE_DROP',
          severity: 'MEDIUM',
          studentName: 'Julian Smith',
          generatedAt: new Date(Date.now() - 3600000).toISOString(),
          status: 'DRAFT',
          content: "Julian's grade in Physics dropped from 85% to 72% following the recent electromagnetism quiz. Recommended intervention: Peer tutoring sessions.",
          contentType: 'message',
          recipient: { name: 'Mr. Teacher', role: 'teacher', id: 't1' },
          aiConfidence: 'MEDIUM',
          expiresAt: new Date(Date.now() + 172800000).toISOString()
        }
      ];
      mockItems.forEach(item => addQueueItem(item));
    }
  }, [role, pathname]);

  return null;
};
