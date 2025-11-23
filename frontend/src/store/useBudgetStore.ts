import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Budget } from '@/types';

export interface BudgetStore {
    budget: Budget;
    setBudget: (budget: Partial<Budget>) => void;
    syncStatus: 'local' | 'pending' | 'synced';
    setSyncStatus: (status: 'local' | 'pending' | 'synced') => void;
    isOffline: boolean;
    setIsOffline: (status: boolean) => void;
    user: { email: string } | null;
    login: (email: string) => void;
    logout: () => void;
}

const initialBudget: Budget = {
    income: 0,
    bills: 0,
    food: 0,
    transport: 0,
    subscriptions: 0,
    miscellaneous: 0,
};

export const useBudgetStore = create<BudgetStore>()(
    persist(
        (set) => ({
            budget: initialBudget,
            syncStatus: 'local',
            isOffline: false,
            user: null,
            setBudget: (newBudget) =>
                set((state) => ({
                    budget: { ...state.budget, ...newBudget },
                    syncStatus: state.isOffline ? 'local' : 'pending',
                })),
            setSyncStatus: (status) => set({ syncStatus: status }),
            setIsOffline: (status) => set({ isOffline: status }),
            login: (email) => set({ user: { email } }),
            logout: () => set({ user: null }),
        }),
        {
            name: 'budget-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                budget: state.budget,
                syncStatus: state.syncStatus,
                user: state.user
            }),
        }
    )
);
