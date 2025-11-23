'use client';

import { useBudgetStore } from '@/store/useBudgetStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { AlertTriangle, TrendingUp, PiggyBank, Activity } from 'lucide-react';

export default function Dashboard() {
    const { budget } = useBudgetStore();

    const totalExpenses =
        budget.bills + budget.food + budget.transport + budget.subscriptions + budget.miscellaneous;
    const savingsPotential = budget.income - totalExpenses;
    const burnRate = budget.income > 0 ? (totalExpenses / budget.income) * 100 : 0;

    const data = [
        { name: 'Bills', value: budget.bills },
        { name: 'Food', value: budget.food },
        { name: 'Transport', value: budget.transport },
        { name: 'Subscriptions', value: budget.subscriptions },
        { name: 'Misc', value: budget.miscellaneous },
    ].filter((item) => item.value > 0);

    const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

    const getWarnings = () => {
        const warnings = [];
        if (budget.income > 0) {
            if (budget.food > budget.income * 0.4) warnings.push('Food spend is > 40% of income.');
            if (budget.subscriptions > budget.income * 0.3) warnings.push('Subscriptions are > 30% of income.');
            if (savingsPotential < 0) warnings.push('Expenses exceed income!');
        }
        return warnings;
    };

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Activity size={80} className="text-indigo-500" />
                    </div>
                    <h3 className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Burn Rate</h3>
                    <p className="text-4xl font-bold text-gray-900">{burnRate.toFixed(1)}%</p>
                    <div className="w-full bg-gray-100 h-2 mt-5 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-1000 ${burnRate > 80 ? 'bg-red-500' : 'bg-indigo-500'}`}
                            style={{ width: `${Math.min(burnRate, 100)}%` }}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <PiggyBank size={80} className={savingsPotential >= 0 ? 'text-emerald-500' : 'text-red-500'} />
                    </div>
                    <h3 className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Savings</h3>
                    <p className={`text-4xl font-bold ${savingsPotential >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        ${savingsPotential.toFixed(2)}
                    </p>
                    <p className="text-xs font-medium text-gray-500 mt-4 flex items-center gap-2">
                        {savingsPotential >= 0 ? (
                            <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">On Track</span>
                        ) : (
                            <span className="text-red-600 bg-red-50 px-2 py-1 rounded-full">Over Budget</span>
                        )}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <TrendingUp size={80} className="text-violet-500" />
                    </div>
                    <h3 className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Forecast</h3>
                    <p className="text-4xl font-bold text-gray-900">
                        ${Math.max(0, savingsPotential).toFixed(0)}
                    </p>
                    <p className="text-xs font-medium text-gray-500 mt-4">
                        <span className="text-violet-600 bg-violet-50 px-2 py-1 rounded-full">Estimated</span>
                    </p>
                </div>
            </div>

            {/* Charts & Warnings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px] flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
                        Expense Breakdown
                    </h3>
                    <div className="flex-1 w-full h-64">
                        {data.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#ffffff',
                                            borderColor: '#e5e7eb',
                                            color: '#1f2937',
                                            borderRadius: '12px',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                        }}
                                        itemStyle={{ color: '#1f2937' }}
                                    />
                                    <Legend
                                        verticalAlign="bottom"
                                        height={36}
                                        iconType="circle"
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
                                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                                    <Activity size={24} />
                                </div>
                                <p>No expense data</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <AlertTriangle size={24} className="text-amber-500" />
                        Insights
                    </h3>
                    {getWarnings().length > 0 ? (
                        <ul className="space-y-3">
                            {getWarnings().map((warning, idx) => (
                                <li key={idx} className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-900 text-sm hover:bg-amber-100 transition-colors">
                                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                                    <span className="font-medium">{warning}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4 py-10">
                            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                                <TrendingUp size={24} className="text-emerald-500" />
                            </div>
                            <div className="text-center">
                                <p className="text-gray-900 font-semibold mb-1">Looking Good!</p>
                                <p className="text-sm">No spending issues detected</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
