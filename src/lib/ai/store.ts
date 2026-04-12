import { create } from 'zustand';
import { ApprovalQueueItem, AIContextPayload, UserRole } from '@/types/ai';

interface AIState {
  isDrawerOpen: boolean;
  activeTab: 'Insights' | 'Actions' | 'Ask';
  pendingActions: ApprovalQueueItem[];
  pageContext: AIContextPayload | null;
  userRole: UserRole;
  
  // Actions
  setDrawerOpen: (open: boolean) => void;
  setActiveTab: (tab: 'Insights' | 'Actions' | 'Ask') => void;
  setPageContext: (context: AIContextPayload) => void;
  setUserRole: (role: UserRole) => void;
  
  // Queue actions
  addQueueItem: (item: ApprovalQueueItem) => void;
  updateQueueItem: (id: string, updates: Partial<ApprovalQueueItem>) => void;
  removeQueueItem: (id: string) => void;
  
  // Trigger actions
  openWithContext: (flagType: string, entityId: string) => void;
}

export const useAIStore = create<AIState>((set) => ({
  isDrawerOpen: false,
  activeTab: 'Insights',
  pendingActions: [], // Will populate with mock data
  pageContext: null,
  userRole: 'teacher',

  setDrawerOpen: (open) => set({ isDrawerOpen: open }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setPageContext: (context) => set({ pageContext: context }),
  setUserRole: (role) => set({ userRole: role }),

  addQueueItem: (item) => set((state) => ({ 
    pendingActions: [item, ...state.pendingActions] 
  })),
  
  updateQueueItem: (id, updates) => set((state) => ({
    pendingActions: state.pendingActions.map((item) => 
      item.id === id ? { ...item, ...updates } : item
    )
  })),
  
  removeQueueItem: (id) => set((state) => ({
    pendingActions: state.pendingActions.filter((item) => item.id !== id)
  })),

  openWithContext: (flagType, entityId) => set({
    isDrawerOpen: true,
    activeTab: 'Insights',
    // In a real app, this would trigger a context-specific fetch
  }),
}));
