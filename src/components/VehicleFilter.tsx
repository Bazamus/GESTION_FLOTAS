interface VehicleFilterProps {
  onFilterChange: (status: string | null) => void;
  activeFilter: string | null;
  vehicleCounts: {
    all: number;
    active: number;
    maintenance: number;
    inactive: number;
  };
}

export default function VehicleFilter({ onFilterChange, activeFilter, vehicleCounts }: VehicleFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        onClick={() => onFilterChange(null)}
        className={`px-3 py-1.5 text-sm rounded-full ${
          activeFilter === null
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
        }`}
      >
        Todos ({vehicleCounts.all})
      </button>
      <button
        onClick={() => onFilterChange('active')}
        className={`px-3 py-1.5 text-sm rounded-full ${
          activeFilter === 'active'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
        }`}
      >
        Activos ({vehicleCounts.active})
      </button>
      <button
        onClick={() => onFilterChange('maintenance')}
        className={`px-3 py-1.5 text-sm rounded-full ${
          activeFilter === 'maintenance'
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
        }`}
      >
        En Mantenimiento ({vehicleCounts.maintenance})
      </button>
      <button
        onClick={() => onFilterChange('inactive')}
        className={`px-3 py-1.5 text-sm rounded-full ${
          activeFilter === 'inactive'
            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
        }`}
      >
        Inactivos ({vehicleCounts.inactive})
      </button>
    </div>
  );
}
