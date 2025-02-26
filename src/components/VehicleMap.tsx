import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { Vehicle } from '../types/fleet';
import { deliveries } from '../data/mockData';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface VehicleMapProps {
  vehicles: Vehicle[];
}

export default function VehicleMap({ vehicles }: VehicleMapProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [vehiclePositions, setVehiclePositions] = useState<Record<string, [number, number]>>({});

  const center = vehicles.length > 0
    ? vehicles.reduce(
        (acc, vehicle) => ({
          lat: acc.lat + vehicle.location.lat / vehicles.length,
          lng: acc.lng + vehicle.location.lng / vehicles.length,
        }),
        { lat: 0, lng: 0 }
      )
    : { lat: 40.4167, lng: -3.7033 }; // Madrid como centro por defecto si no hay vehículos

  const statusColors = {
    active: 'text-green-600 dark:text-green-400',
    maintenance: 'text-yellow-600 dark:text-yellow-400',
    inactive: 'text-red-600 dark:text-red-400',
  };

  const statusTranslations = {
    active: 'Activo',
    maintenance: 'En Mantenimiento',
    inactive: 'Inactivo',
  };

  // Encontrar entregas para el vehículo seleccionado
  const activeDeliveries = selectedVehicle
    ? deliveries.filter(d => d.vehicleId === selectedVehicle.id && d.status === 'in-progress')
    : [];

  // Crear líneas para las rutas de entrega
  const deliveryRoutes = activeDeliveries.flatMap(delivery => {
    if (delivery.route && delivery.route.length > 0) {
      return [delivery.route];
    }
    return [];
  });

  // Función para actualizar la posición de un vehículo
  const updateVehiclePosition = (vehicleId: string, newPosition: [number, number]) => {
    setVehiclePositions(prev => ({
      ...prev,
      [vehicleId]: newPosition
    }));
  };

  useEffect(() => {
    // Hacer disponible la función para el componente padre
    if (typeof window !== 'undefined') {
      (window as any).updateVehiclePosition = updateVehiclePosition;
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).updateVehiclePosition;
      }
    };
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ubicación de Vehículos</h2>
      <div className="h-[400px] rounded-lg overflow-hidden">
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={6}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {vehicles.map((vehicle) => (
            <Marker
              key={vehicle.id}
              position={vehiclePositions[vehicle.id] || [vehicle.location.lat, vehicle.location.lng]}
              eventHandlers={{
                click: () => {
                  setSelectedVehicle(vehicle);
                },
              }}
            >
              <Popup>
                <div className="p-2 dark:bg-gray-800 dark:text-white">
                  <h3 className="font-semibold">{vehicle.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Conductor: {vehicle.driver}</p>
                  <p className={`text-sm font-medium ${statusColors[vehicle.status]}`}>
                    {statusTranslations[vehicle.status]}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Combustible: {vehicle.fuelLevel}%
                  </p>
                  {activeDeliveries.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium">Entrega en curso:</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{activeDeliveries[0].destination}</p>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Mostrar destinos de entregas activas para el vehículo seleccionado */}
          {selectedVehicle && activeDeliveries.map((delivery) => (
            delivery.route && delivery.route.length > 0 && (
              <Marker
                key={delivery.id}
                position={delivery.route[delivery.route.length - 1]}
              >
                <Popup>
                  <div className="p-2 dark:bg-gray-800 dark:text-white">
                    <h3 className="font-semibold">Destino de Entrega</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{delivery.destination}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Cliente: {delivery.customer}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ETA: {delivery.estimatedArrival ? format(new Date(delivery.estimatedArrival), 'HH:mm', { locale: es }) : 'No disponible'}
                    </p>
                  </div>
                </Popup>
              </Marker>
            )
          ))}

          {/* Mostrar rutas de entrega */}
          {deliveryRoutes.map((route, index) => (
            <Polyline
              key={index}
              positions={route as LatLngExpression[]}
              color="#3B82F6"
              weight={3}
              dashArray="5, 10"
            />
          ))}
        </MapContainer>
      </div>
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <p>Haga clic en un vehículo para ver más detalles y sus rutas de entrega activas.</p>
      </div>
    </div>
  );
}