import { useState, useRef } from 'react';
import { Menu, Bell, User, BarChart3 } from 'lucide-react';
import VehicleCard from './components/VehicleCard';
import TabView from './components/TabView';
import DashboardStats from './components/DashboardStats';
import VehicleMap from './components/VehicleMap';
import ThemeToggle from './components/ThemeToggle';
import DashboardHeader from './components/DashboardHeader';
import VehicleFilter from './components/VehicleFilter';
import VehicleSearch from './components/VehicleSearch';
import AlertsPanel from './components/AlertsPanel';
import AdvancedStats from './components/AdvancedStats';
import RouteSimulator from './components/RouteSimulator';
import { vehicles, deliveries } from './data/mockData';
import { Vehicle } from './types/fleet';

function App() {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(vehicles);
  const [showAlerts, setShowAlerts] = useState(false);
  const [showAdvancedStats, setShowAdvancedStats] = useState(false);
  const mapRef = useRef<any>(null);

  // Aplicar filtros de estado
  const applyStatusFilter = (vehicles: Vehicle[], status: string | null) => {
    return status ? vehicles.filter(vehicle => vehicle.status === status) : vehicles;
  };

  // Manejar cambio de filtro de estado
  const handleStatusFilterChange = (status: string | null) => {
    setStatusFilter(status);
    setFilteredVehicles(applyStatusFilter(vehicles, status));
  };

  // Manejar resultados de búsqueda
  const handleSearchResults = (results: Vehicle[]) => {
    setFilteredVehicles(applyStatusFilter(results, statusFilter));
  };

  // Actualizar posición de vehículo en el mapa
  const handleVehiclePositionUpdate = (vehicleId: string, newPosition: [number, number]) => {
    if (typeof window !== 'undefined' && (window as any).updateVehiclePosition) {
      (window as any).updateVehiclePosition(vehicleId, newPosition);
    }
  };

  // Contar vehículos por estado
  const vehicleCounts = {
    all: vehicles.length,
    active: vehicles.filter(v => v.status === 'active').length,
    maintenance: vehicles.filter(v => v.status === 'maintenance').length,
    inactive: vehicles.filter(v => v.status === 'inactive').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Barra Lateral Izquierda */}
      <aside className="hidden lg:flex lg:flex-col w-80 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Flota de Vehículos</h2>
          <VehicleSearch 
            vehicles={vehicles} 
            onSearchResults={handleSearchResults} 
          />
          <VehicleFilter 
            onFilterChange={handleStatusFilterChange} 
            activeFilter={statusFilter}
            vehicleCounts={vehicleCounts}
          />
          <div className="space-y-4">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </aside>

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col">
        {/* Encabezado */}
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400 lg:hidden" />
                <h1 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">Panel de Gestión de Flota</h1>
              </div>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <button 
                  className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white relative"
                  onClick={() => setShowAdvancedStats(!showAdvancedStats)}
                  title="Estadísticas Avanzadas"
                >
                  <BarChart3 className="h-6 w-6" />
                </button>
                <button 
                  className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white relative"
                  onClick={() => setShowAlerts(!showAlerts)}
                >
                  <Bell className="h-6 w-6" />
                  {vehicleCounts.maintenance + vehicleCounts.inactive > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      {vehicleCounts.maintenance + vehicleCounts.inactive}
                    </span>
                  )}
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  <User className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Área de Panel de Control */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <DashboardHeader vehicles={vehicles} deliveries={deliveries} />
            {showAlerts && <AlertsPanel vehicles={vehicles} />}
            {showAdvancedStats && <AdvancedStats vehicles={vehicles} />}
            <RouteSimulator 
              vehicles={vehicles} 
              onVehiclePositionUpdate={handleVehiclePositionUpdate} 
            />
            <DashboardStats vehicles={vehicles} />
            <div className="mt-8" ref={mapRef}>
              <VehicleMap vehicles={filteredVehicles} />
            </div>
          </div>
        </main>
      </div>

      {/* Barra Lateral Derecha */}
      <aside className="hidden lg:flex lg:flex-col w-96 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
        <TabView vehicles={filteredVehicles} deliveries={deliveries} />
      </aside>
    </div>
  );
}

export default App;