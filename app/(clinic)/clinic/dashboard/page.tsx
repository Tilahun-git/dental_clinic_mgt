'use client';

import { useAuth } from '../../../lib/auth-context';
import AdminDashboard from './admin-dashboard';
import ReceptionistDashboard from './receptionist-dashboard';
import DentistDashboard from './dentist-dashboard';
import CashierDashboard from './cashier-dashboard';
import InventoryDashboard from './inventory-dashboard';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'ADMIN':
    case 'SYSTEM_ADMINISTRATOR':
      return <AdminDashboard />;
    case 'RECEPTIONIST':
      return <ReceptionistDashboard />;
    case 'DENTIST':
      return <DentistDashboard />;
    case 'CASHIER':
      return <CashierDashboard />;
    case 'INVENTORY_MANAGER':
      return <InventoryDashboard />;
    default:
      return <AdminDashboard />;
  }
}
