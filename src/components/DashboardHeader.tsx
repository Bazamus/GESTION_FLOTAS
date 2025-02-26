import { Calendar, MapPin, Package } from 'lucide-react';
import { Vehicle, Delivery } from '../types/fleet';

interface DashboardHeaderProps {
  vehicles: Vehicle[];
  deliveries: Delivery[];
}

export default function DashboardHeader({ vehicles, deliveries }: DashboardHeaderProps) {
  const activeDeliveries = deliveries.filter(d => d.status === 'in-progress').length;
  const activeVehicles = vehicles.filter(v => v.status === 'active').length;
  const totalDeliveries = deliveries.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100">Vehículos Activos</p>
            <p className="text-3xl font-bold mt-1">{activeVehicles}</p>
            <p className="text-sm text-blue-100 mt-1">de {vehicles.length} en total</p>
          </div>
          <div className="p-3 bg-blue-400 bg-opacity-30 rounded-full">
            <MapPin className="h-8 w-8" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100">Entregas Activas</p>
            <p className="text-3xl font-bold mt-1">{activeDeliveries}</p>
            <p className="text-sm text-green-100 mt-1">de {totalDeliveries} en total</p>
          </div>
          <div className="p-3 bg-green-400 bg-opacity-30 rounded-full">
            <Package className="h-8 w-8" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100">Mantenimiento Programado</p>
            <p className="text-3xl font-bold mt-1">
              {vehicles.filter(v => v.status === 'maintenance').length}
            </p>
            <p className="text-sm text-purple-100 mt-1">vehículos en servicio</p>
          </div>
          <div className="p-3 bg-purple-400 bg-opacity-30 rounded-full">
            <Calendar className="h-8 w-8" />
          </div>
        </div>
      </div>
    </div>
  );
}