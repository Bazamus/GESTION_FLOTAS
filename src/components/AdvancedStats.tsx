import { Vehicle } from '../types/fleet';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface AdvancedStatsProps {
  vehicles: Vehicle[];
}

export default function AdvancedStats({ vehicles }: AdvancedStatsProps) {
  // Datos para el gráfico de barras de niveles de combustible
  const fuelData = vehicles.map(vehicle => ({
    name: vehicle.name.replace(/^(Camión|Furgoneta|Coche)\s/, ''),
    nivel: vehicle.fuelLevel,
  }));

  // Datos para el gráfico circular de tipos de vehículos
  const vehicleTypes = vehicles.reduce((acc, vehicle) => {
    acc[vehicle.type] = (acc[vehicle.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const typeData = Object.entries(vehicleTypes).map(([type, count]) => ({
    name: type === 'car' ? 'Coche' : type === 'truck' ? 'Camión' : 'Furgoneta',
    value: count,
  }));

  // Datos para el gráfico de barras de estado de vehículos
  const statusData = [
    { name: 'Activos', value: vehicles.filter(v => v.status === 'active').length },
    { name: 'Mantenimiento', value: vehicles.filter(v => v.status === 'maintenance').length },
    { name: 'Inactivos', value: vehicles.filter(v => v.status === 'inactive').length },
  ];

  // Colores para los gráficos
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Estadísticas Avanzadas</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de niveles de combustible */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">Niveles de Combustible</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={fuelData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="nivel" name="Nivel de Combustible (%)" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico circular de tipos de vehículos */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">Distribución por Tipo</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {typeData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de estado de vehículos */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg lg:col-span-2">
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">Estado de la Flota</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={statusData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Cantidad" fill="#10B981">
                  {statusData.map((_, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === 0 ? '#10B981' : index === 1 ? '#FBBF24' : '#EF4444'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
