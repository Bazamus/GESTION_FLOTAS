import { useState, useRef } from 'react';
import { Menu, Bell, User, BarChart3, X } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Barra Lateral Izquierda - Versión Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-80 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 overflow-y-auto fixed top-0 bottom-0 left-0">
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

      {/* Barra Lateral Izquierda - Versión Móvil */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative flex flex-col w-full max-w-xs bg-white dark:bg-gray-800 h-full overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Flota de Vehículos</h2>
              <button 
                className="p-2 text-gray-500 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <VehicleSearch 
                vehicles={vehicles} 
                onSearchResults={handleSearchResults} 
              />
              <VehicleFilter 
                onFilterChange={handleStatusFilterChange} 
                activeFilter={statusFilter}
                vehicleCounts={vehicleCounts}
              />
              <div className="space-y-4 mt-4">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col lg:ml-80">
        {/* Encabezado */}
        <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button 
                  className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <h1 className="ml-2 text-lg sm:text-xl font-semibold text-gray-900 dark:text-white truncate">Panel de Gestión de Flota</h1>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <ThemeToggle />
                <button 
                  className="p-1 sm:p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white relative"
                  onClick={() => setShowAdvancedStats(!showAdvancedStats)}
                  title="Estadísticas Avanzadas"
                >
                  <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
                <button 
                  className="p-1 sm:p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white relative"
                  onClick={() => setShowAlerts(!showAlerts)}
                >
                  <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
                  {vehicleCounts.maintenance + vehicleCounts.inactive > 0 && (
                    <span className="absolute top-0 right-0 h-3 w-3 sm:h-4 sm:w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      {vehicleCounts.maintenance + vehicleCounts.inactive}
                    </span>
                  )}
                </button>
                <button className="p-1 sm:p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  <User className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Área de Panel de Control */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <DashboardHeader vehicles={vehicles} deliveries={deliveries} />
          {showAlerts && <AlertsPanel vehicles={vehicles} />}
          {showAdvancedStats && <AdvancedStats vehicles={vehicles} />}
          <RouteSimulator 
            vehicles={vehicles} 
            onVehiclePositionUpdate={handleVehiclePositionUpdate} 
          />
          <DashboardStats vehicles={vehicles} />
          <div className="mt-6 sm:mt-8" ref={mapRef}>
            <VehicleMap vehicles={filteredVehicles} />
          </div>
        </main>
      </div>

      {/* Barra Lateral Derecha */}
      <aside className="hidden lg:flex lg:flex-col w-96 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 fixed top-0 bottom-0 right-0">
        <TabView vehicles={filteredVehicles} deliveries={deliveries} />
      </aside>
    </div>
  );
}

export default App;