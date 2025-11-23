'use client';

import { useBudgetStore } from '@/store/useBudgetStore';
import { ChangeEvent } from 'react';

export default function BudgetForm() {
    const { budget, setBudget } = useBudgetStore();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBudget({ [name]: parseFloat(value) || 0 });
    };

    const fields = [
        { name: 'income', label: 'Monthly Income', placeholder: '5000' },
        { name: 'bills', label: 'Fixed Bills', placeholder: '2000' },
        { name: 'food', label: 'Food & Dining', placeholder: '800' },
        { name: 'transport', label: 'Transport', placeholder: '300' },
        { name: 'subscriptions', label: 'Subscriptions', placeholder: '100' },
        { name: 'miscellaneous', label: 'Miscellaneous', placeholder: '500' },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-full">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-violet-600 rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-900">Budget Planner</h2>
            </div>

            <div className="space-y-5">
                {fields.map((field) => (
                    <div key={field.name} className="group">
                        <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide group-focus-within:text-indigo-600 transition-colors">
                            {field.label}
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-3.5 text-gray-400 font-medium group-focus-within:text-indigo-500 transition-colors">$</span>
                            <input
                                type="number"
                                name={field.name}
                                value={budget[field.name as keyof typeof budget] || ''}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all pl-8 font-medium"
                                placeholder={field.placeholder}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
