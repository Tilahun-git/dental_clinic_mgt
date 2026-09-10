'use client';

import { useState } from 'react';
import { inventory } from '../../../lib/mock-data';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { SearchInput } from '../../../components/ui/search-input';
import { Package, Plus, AlertTriangle } from 'lucide-react';

export default function InventoryPage() {
  const [search, setSearch] = useState('');
  const lowStock = inventory.filter(i => i.quantity < i.minQuantity);

  const filtered = inventory.filter(item =>
    `${item.name} ${item.category} ${item.supplier}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Inventory</h1>
          <p className="text-slate-500 text-sm mt-1">{inventory.length} items tracked</p>
        </div>
        <Button variant="primary"><Plus size={16} /> Add Item</Button>
      </div>

      {/* Low stock alert */}
      {lowStock.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-5 flex items-start gap-3">
          <AlertTriangle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-700">Low Stock Alert â€” {lowStock.length} items need reordering</p>
            <p className="text-red-600 text-sm mt-0.5">{lowStock.map(i => i.name).join(' Â· ')}</p>
          </div>
        </div>
      )}

      {/* Category summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Items', value: inventory.length, icon: Package, color: 'text-sky-600 bg-sky-50' },
          { label: 'Low Stock', value: lowStock.length, icon: AlertTriangle, color: 'text-red-600 bg-red-50' },
          { label: 'Categories', value: new Set(inventory.map(i => i.category)).size, icon: Package, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Total Value', value: `${inventory.reduce((s, i) => s + (i.quantity * i.unitCost), 0).toLocaleString()} ETB`, icon: Package, color: 'text-amber-600 bg-amber-50' },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.color} rounded-xl p-4`}>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm mt-1 opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      <Card padding={false}>
        <div className="p-4 border-b border-slate-100">
          <SearchInput
            placeholder="Search items, categories, suppliers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Item', 'Category', 'Stock Level', 'Qty', 'Min', 'Unit Cost', 'Supplier', 'Expiry', 'Status'].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const isLow = item.quantity < item.minQuantity;
                const pct = Math.min(100, Math.round((item.quantity / item.minQuantity) * 100));
                return (
                  <tr key={item.id} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${isLow ? 'bg-red-50/30' : ''}`}>
                    <td className="py-3 px-4">
                      <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                      <p className="text-xs text-slate-400">{item.location}</p>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="default">{item.category}</Badge>
                    </td>
                    <td className="py-3 px-4 min-w-[120px]">
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${isLow ? 'bg-red-500' : pct > 75 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm font-bold text-slate-800">{item.quantity}</td>
                    <td className="py-3 px-4 text-sm text-slate-500">{item.minQuantity}</td>
                    <td className="py-3 px-4 text-sm text-slate-700">{item.unitCost.toLocaleString()} ETB</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{item.supplier}</td>
                    <td className="py-3 px-4 text-sm text-slate-600 whitespace-nowrap">{item.expiryDate}</td>
                    <td className="py-3 px-4">
                      {isLow ? (
                        <Badge variant="danger">LOW STOCK</Badge>
                      ) : (
                        <Badge variant="success">OK</Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

