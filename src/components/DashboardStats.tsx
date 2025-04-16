import { Truck, Wrench, AlertTriangle, CheckCircle } from 'lucide-react';
import { Vehicle } from '../types/fleet';

interface DashboardStatsProps {
  vehicles: Vehicle[];
}

export default function DashboardStats({ vehicles }: DashboardStatsProps) {
  const stats = {
    total: vehicles.length,
    active: vehicles.filter(v => v.status === 'active').length,
    maintenance: vehicles.filter(v => v.status === 'maintenance').length,
    inactive: vehicles.filter(v => v.status === 'inactive').length,
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Total Vehículos</p>
            <p className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">{stats.total}</p>
          </div>
          <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
            <Truck className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Vehículos Activos</p>
            <p className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">{stats.active}</p>
          </div>
          <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-900 rounded-full">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">En Mantenimiento</p>
            <p className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">{stats.maintenance}</p>
          </div>
          <div className="p-2 sm:p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
            <Wrench className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Vehículos Inactivos</p>
            <p className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">{stats.inactive}</p>
          </div>
          <div className="p-2 sm:p-3 bg-red-100 dark:bg-red-900 rounded-full">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-red-600 dark:text-red-400" />
          </div>
        </div>
      </div>
    </div>
  );
}