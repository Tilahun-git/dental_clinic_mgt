'use client';

import { useAuth } from '../../../lib/auth-context';
import { inventory } from '../../../lib/mock-data';
import { Card, CardHeader, CardTitle } from '../../../components/ui/card';
import { Package, AlertTriangle, TrendingDown, CheckCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { CategoryBar } from '../../../components/dashboard-charts';

export default function InventoryDashboard() {
  const { user } = useAuth();
  const lowStock = inventory.filter(i => i.quantity < i.minQuantity);
  const outOfStock = inventory.filter(i => i.quantity === 0);
  const adequate = inventory.filter(i => i.quantity >= i.minQuantity);
  const expiringSoon = inventory.filter(i => {
    if (!i.expiryDate) return false;
    const expiry = new Date(i.expiryDate);
    const now = new Date('2025-07-14');
    const days = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return days <= 90;
  });

  const categoryGroups = inventory.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {});

  const categoryColors = ['bg-teal-500', 'bg-indigo-500', 'bg-amber-500', 'bg-emerald-500', 'bg-violet-500', 'bg-rose-500', 'bg-orange-500'];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Inventory Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome, {user?.name} — Stock overview for SmileCare Clinic</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Items', value: inventory.length, icon: Package, color: 'from-teal-500 to-teal-600', sub: 'in inventory' },
          { label: 'Low Stock', value: lowStock.length, icon: AlertTriangle, color: 'from-amber-500 to-orange-500', sub: 'below minimum' },
          { label: 'Expiring Soon', value: expiringSoon.length, icon: TrendingDown, color: 'from-red-500 to-rose-600', sub: 'within 90 days' },
          { label: 'Adequate Stock', value: adequate.length, icon: CheckCircle, color: 'from-emerald-500 to-emerald-600', sub: 'well stocked' },
        ].map(stat => (
          <div key={stat.label} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-5 text-white shadow-lg`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/80 text-xs font-medium">{stat.label}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
                <p className="text-white/70 text-xs mt-1">{stat.sub}</p>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <stat.icon size={20} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Low stock alert banner */}
      {lowStock.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-amber-800 text-sm">Low Stock Alert</p>
            <p className="text-amber-600 text-xs mt-0.5">
              {lowStock.map(i => i.name).join(', ')} — need restocking immediately.
            </p>
          </div>
          <Link href="/clinic/inventory"
            className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors flex-shrink-0">
            Order Now
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Category breakdown */}
        <Card>
          <CardTitle className="mb-4">By Category</CardTitle>
          <CategoryBar categories={Object.keys(categoryGroups)} values={Object.values(categoryGroups)} />
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link href="/clinic/inventory"
              className="block text-center bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
              Manage All Inventory
            </Link>
          </div>
        </Card>

        {/* Low stock items */}
        <Card className="lg:col-span-2" padding={false}>
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-500" />
              <CardTitle>Low Stock Items</CardTitle>
              <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">{lowStock.length}</span>
            </div>
            <Link href="/clinic/inventory" className="text-teal-600 text-sm font-semibold hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {lowStock.map(item => {
              const pct = Math.round((item.quantity / item.minQuantity) * 100);
              return (
                <div key={item.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0 mr-3">
                      <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.category} · {item.location}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-red-600">{item.quantity} {item.unit}</p>
                      <p className="text-xs text-gray-400">min: {item.minQuantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${pct < 30 ? 'bg-red-500' : 'bg-amber-500'}`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                    <span className={`text-xs font-bold ${pct < 30 ? 'text-red-600' : 'text-amber-600'}`}>{pct}%</span>
                  </div>
                </div>
              );
            })}
            {lowStock.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <CheckCircle size={32} className="mx-auto mb-2 text-emerald-400" />
                <p className="text-sm">All items are adequately stocked</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Expiring items */}
      {expiringSoon.length > 0 && (
        <Card padding={false}>
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TrendingDown size={16} className="text-red-500" />
              <CardTitle>Expiring Soon (90 days)</CardTitle>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Item', 'Category', 'Qty', 'Expiry Date', 'Location'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {expiringSoon.map(item => {
                  const expiry = new Date(item.expiryDate!);
                  const days = Math.round((expiry.getTime() - new Date('2025-07-14').getTime()) / (1000 * 60 * 60 * 24));
                  return (
                    <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800">{item.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{item.category}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{item.quantity} {item.unit}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${days <= 30 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                          {item.expiryDate} ({days} days)
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{item.location}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
