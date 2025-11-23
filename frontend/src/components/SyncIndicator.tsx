'use client';

import { useBudgetStore } from '@/store/useBudgetStore';
import { Cloud, CloudOff, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SyncIndicator() {
    const { syncStatus, isOffline, setIsOffline, budget, setSyncStatus } = useBudgetStore();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        setIsOffline(!navigator.onLine);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [setIsOffline]);

    const handleSync = async () => {
        if (isOffline) return;
        setLoading(true);
        try {
            const response = await fetch('https://assignment-a-budgetbox-production.up.railway.app/budget/sync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: 'hire-me@anshumat.org',
                    budget: budget,
                    timestamp: new Date().toISOString(),
                }),
            });

            if (response.ok) {
                setSyncStatus('synced');
            } else {
                console.error('Sync failed');
            }
        } catch (error) {
            console.error('Sync error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <div className="bg-white border border-gray-200 px-5 py-3 rounded-full flex items-center gap-3 shadow-lg hover:shadow-xl transition-shadow">
                {isOffline ? (
                    <>
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                        <CloudOff size={18} className="text-red-500" />
                        <span className="text-xs font-bold text-red-600 uppercase tracking-wide">Offline</span>
                    </>
                ) : (
                    <>
                        {syncStatus === 'synced' ? (
                            <>
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                <CheckCircle2 size={18} className="text-emerald-500" />
                                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">Synced</span>
                            </>
                        ) : (
                            <>
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                                <RefreshCw size={18} className={`text-amber-500 ${loading ? 'animate-spin' : ''}`} />
                                <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">
                                    {loading ? 'Syncing...' : 'Pending'}
                                </span>
                                {!loading && (
                                    <button
                                        onClick={handleSync}
                                        className="ml-2 text-[10px] font-bold bg-indigo-500 hover:bg-indigo-600 px-3 py-1.5 rounded-full transition-colors text-white uppercase tracking-wider shadow-sm"
                                    >
                                        Sync
                                    </button>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
