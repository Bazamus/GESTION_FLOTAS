import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Vehicle } from '../types/fleet';
import { deliveries } from '../data/mockData';

interface RouteSimulatorProps {
  vehicles: Vehicle[];
  onVehiclePositionUpdate: (vehicleId: string, newPosition: [number, number]) => void;
}

// Función para calcular un punto intermedio entre dos coordenadas
const interpolatePosition = (start: [number, number], end: [number, number], fraction: number): [number, number] => {
  return [
    start[0] + (end[0] - start[0]) * fraction,
    start[1] + (end[1] - start[1]) * fraction
  ];
};

export default function RouteSimulator({ vehicles, onVehiclePositionUpdate }: RouteSimulatorProps) {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [simulationSpeed, setSimulationSpeed] = useState(1);

  // Filtrar solo vehículos activos con entregas en curso
  const activeVehicles = vehicles.filter(v => 
    v.status === 'active' && 
    v.currentDelivery
  );

  // Obtener la ruta para un vehículo
  const getRouteForVehicle = (vehicleId: string) => {
    const delivery = deliveries.find(d => 
      d.vehicleId === vehicleId && 
      d.status === 'in-progress' && 
      d.route && 
      d.route.length > 1
    );
    return delivery?.route || null;
  };

  // Reiniciar la simulación
  const resetSimulation = () => {
    setProgress(0);
    setIsSimulating(false);
    
    // Restaurar la posición original del vehículo
    if (selectedVehicleId) {
      const vehicle = vehicles.find(v => v.id === selectedVehicleId);
      if (vehicle && vehicle.location) {
        onVehiclePositionUpdate(selectedVehicleId, [vehicle.location.lat, vehicle.location.lng]);
      }
    }
  };

  // Efecto para la simulación
  useEffect(() => {
    if (!isSimulating || !selectedVehicleId) return;

    const route = getRouteForVehicle(selectedVehicleId);
    if (!route) return;

    const totalSegments = route.length - 1;
    
    // Calcular en qué segmento estamos y la fracción dentro de ese segmento
    const totalProgress = progress * totalSegments;
    const currentSegment = Math.min(Math.floor(totalProgress), totalSegments - 1);
    const segmentProgress = totalProgress - currentSegment;
    
    // Calcular la nueva posición interpolada
    const start = route[currentSegment];
    const end = route[currentSegment + 1];
    const newPosition = interpolatePosition(start, end, segmentProgress);
    
    // Actualizar la posición del vehículo
    onVehiclePositionUpdate(selectedVehicleId, newPosition);
    
    // Configurar el intervalo para avanzar la simulación
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 0.005 * simulationSpeed;
        if (newProgress >= 1) {
          clearInterval(interval);
          setIsSimulating(false);
          return 1;
        }
        return newProgress;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [isSimulating, selectedVehicleId, progress, vehicles, onVehiclePositionUpdate, simulationSpeed]);

  // Verificar si hay vehículos con rutas disponibles
  const vehiclesWithRoutes = activeVehicles.filter(v => getRouteForVehicle(v.id) !== null);

  if (vehiclesWithRoutes.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Simulador de Rutas
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No hay vehículos activos con rutas disponibles para simular
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Simulador de Rutas
      </h2>
      
      <div className="mb-4">
        <label htmlFor="vehicle-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Seleccionar Vehículo
        </label>
        <select
          id="vehicle-select"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={selectedVehicleId || ''}
          onChange={(e) => {
            resetSimulation();
            setSelectedVehicleId(e.target.value || null);
          }}
        >
          <option value="">Seleccionar un vehículo</option>
          {vehiclesWithRoutes.map(vehicle => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.name} - {vehicle.driver}
            </option>
          ))}
        </select>
      </div>
      
      {selectedVehicleId && (
        <>
          <div className="mb-4">
            <label htmlFor="speed-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Velocidad de Simulación
            </label>
            <select
              id="speed-select"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={simulationSpeed}
              onChange={(e) => setSimulationSpeed(Number(e.target.value))}
            >
              <option value="0.5">Lenta</option>
              <option value="1">Normal</option>
              <option value="2">Rápida</option>
              <option value="4">Muy Rápida</option>
            </select>
          </div>
          
          <div className="flex items-center mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-4">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${progress * 100}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 w-12">
              {Math.round(progress * 100)}%
            </span>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className={`flex items-center justify-center px-4 py-2 rounded-lg text-white ${
                isSimulating ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
              }`}
              disabled={progress >= 1}
            >
              {isSimulating ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pausar
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  {progress > 0 ? 'Continuar' : 'Iniciar'}
                </>
              )}
            </button>
            
            <button
              onClick={resetSimulation}
              className="flex items-center justify-center px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg text-white"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reiniciar
            </button>
          </div>
          
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <p>Simulando ruta de entrega para el vehículo seleccionado. Observe el movimiento en el mapa.</p>
          </div>
        </>
      )}
    </div>
  );
}
