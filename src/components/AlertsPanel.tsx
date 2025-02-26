import { AlertTriangle, BatteryLow, Wrench, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Vehicle } from '../types/fleet';

interface Alert {
  id: string;
  type: 'fuel' | 'maintenance' | 'inactive';
  message: string;
  timestamp: Date;
  vehicleId: string;
}

interface AlertsPanelProps {
  vehicles: Vehicle[];
}

export default function AlertsPanel({ vehicles }: AlertsPanelProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Generar alertas basadas en los datos de los vehículos
    const newAlerts: Alert[] = [];
    
    vehicles.forEach(vehicle => {
      // Alerta de combustible bajo
      if (vehicle.fuelLevel < 30) {
        newAlerts.push({
          id: `fuel-${vehicle.id}`,
          type: 'fuel',
          message: `Nivel de combustible bajo (${vehicle.fuelLevel}%)`,
          timestamp: new Date(),
          vehicleId: vehicle.id
        });
      }
      
      // Alerta de mantenimiento próximo
      const maintenanceDate = new Date(vehicle.nextMaintenance);
      const daysToMaintenance = Math.ceil((maintenanceDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysToMaintenance <= 3) {
        newAlerts.push({
          id: `maintenance-${vehicle.id}`,
          type: 'maintenance',
          message: `Mantenimiento programado en ${daysToMaintenance} día(s)`,
          timestamp: new Date(),
          vehicleId: vehicle.id
        });
      }
      
      // Alerta de vehículo inactivo
      if (vehicle.status === 'inactive') {
        newAlerts.push({
          id: `inactive-${vehicle.id}`,
          type: 'inactive',
          message: 'Vehículo inactivo',
          timestamp: new Date(),
          vehicleId: vehicle.id
        });
      }
    });
    
    setAlerts(newAlerts);
  }, [vehicles]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'fuel':
        return <BatteryLow className="w-5 h-5 text-yellow-500" />;
      case 'maintenance':
        return <Wrench className="w-5 h-5 text-blue-500" />;
      case 'inactive':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  if (alerts.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Alertas
        </h2>
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          No hay alertas activas en este momento
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        Alertas ({alerts.length})
      </h2>
      <div className="space-y-3 max-h-[300px] overflow-y-auto">
        {alerts.map(alert => {
          const vehicle = vehicles.find(v => v.id === alert.vehicleId);
          return (
            <div key={alert.id} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-shrink-0 mt-1">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {vehicle?.name}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {alert.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{alert.message}</p>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Conductor: {vehicle?.driver}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
