import { Search } from 'lucide-react';
import { useState } from 'react';
import { Vehicle } from '../types/fleet';

interface VehicleSearchProps {
  vehicles: Vehicle[];
  onSearchResults: (results: Vehicle[]) => void;
}

export default function VehicleSearch({ vehicles, onSearchResults }: VehicleSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (!term.trim()) {
      onSearchResults(vehicles); // Restaurar todos los vehículos si no hay término de búsqueda
      return;
    }
    
    const results = vehicles.filter(vehicle => 
      vehicle.name.toLowerCase().includes(term) || 
      vehicle.driver.toLowerCase().includes(term) ||
      vehicle.type.toLowerCase().includes(term)
    );
    
    onSearchResults(results);
  };

  return (
    <div className="relative mb-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar vehículo por nombre, conductor o tipo..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
      </div>
    </div>
  );
}
