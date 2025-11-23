export interface Budget {
    income: number;
    bills: number;
    food: number;
    transport: number;
    subscriptions: number;
    miscellaneous: number;
    lastSynced?: string;
}

export interface BudgetStore {
    budget: Budget;
    setBudget: (budget: Partial<Budget>) => void;
    syncStatus: 'local' | 'pending' | 'synced';
    setSyncStatus: (status: 'local' | 'pending' | 'synced') => void;
    isOffline: boolean;
    setIsOffline: (status: boolean) => void;
}
