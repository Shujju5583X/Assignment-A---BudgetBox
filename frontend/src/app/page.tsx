'use client';

import BudgetForm from '@/components/BudgetForm';
import Dashboard from '@/components/Dashboard';
import SyncIndicator from '@/components/SyncIndicator';
import { useBudgetStore } from '@/store/useBudgetStore';
import { useState } from 'react';
import { LogOut, Wallet, ArrowRight } from 'lucide-react';

export default function Home() {
  const { user, login, logout } = useBudgetStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'hire-me@anshumat.org' && password === 'HireMe@2025!') {
      login(email);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-white to-violet-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-10">
            <div className="flex flex-col items-center mb-10">
              <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-md mb-6">
                <Wallet className="text-white w-8 h-8" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">BudgetBox</h1>
              <p className="text-gray-500 mt-2 text-sm">
                Your Personal Finance Manager
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center font-medium">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-4 rounded-xl shadow-md transform transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                <span>Sign In</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-500 font-medium mb-2">DEMO CREDENTIALS</p>
                <div className="inline-flex items-center gap-4 text-xs bg-gray-50 px-4 py-2 rounded-full border border-gray-200 text-gray-600">
                  <span>hire-me@anshumat.org</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>HireMe@2025!</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 lg:p-10">
        <header className="flex justify-between items-center mb-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-md">
              <Wallet className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">BudgetBox</h1>
              <p className="text-sm text-gray-500">Welcome back, <span className="text-indigo-600 font-medium">{user.email}</span></p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all px-5 py-2.5 rounded-xl hover:bg-gray-50"
          >
            <LogOut size={18} />
            <span className="font-medium">Logout</span>
          </button>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-10">
            <BudgetForm />
          </div>
          <div className="lg:col-span-8">
            <Dashboard />
          </div>
        </main>

        <SyncIndicator />
      </div>
    </div>
  );
}
