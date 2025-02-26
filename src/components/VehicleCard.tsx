import { Car, Truck, Battery, Calendar, Navigation } from 'lucide-react';
import { Vehicle } from '../types/fleet';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const vehicleIcons = {
  car: Car,
  truck: Truck,
  van: Truck,
};

const statusTranslations = {
  active: 'Activo',
  maintenance: 'En Mantenimiento',
  inactive: 'Inactivo',
};

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const Icon = vehicleIcons[vehicle.type];
  
  const statusColors = {
    active: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100',
    maintenance: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100',
    inactive: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100',
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 text-gray-600 dark:text-gray-400 ${vehicle.type === 'van' ? 'scale-90' : ''}`} />
          <h3 className="text-base font-medium text-gray-900 dark:text-white">{vehicle.name}</h3>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[vehicle.status]}`}>
          {statusTranslations[vehicle.status]}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">{vehicle.driver}</span>
          <div className="flex items-center gap-1">
            <Battery className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-900 dark:text-white">{vehicle.fuelLevel}%</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-500 dark:text-gray-400">
              {format(new Date(vehicle.nextMaintenance), 'dd MMM', { locale: es })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Navigation className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-500 dark:text-gray-400">
              Ubicación
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}