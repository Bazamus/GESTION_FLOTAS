import { Vehicle, Delivery } from '../types/fleet';

// Vehículos con ubicaciones en España
export const vehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Camión Madrid-01',
    type: 'truck',
    status: 'active',
    driver: 'Carlos Rodríguez',
    fuelLevel: 85,
    location: { lat: 40.4168, lng: -3.7038 }, // Madrid
    position: [40.4168, -3.7038],
    nextMaintenance: '2023-09-15',
    currentDelivery: '1'
  },
  {
    id: '2',
    name: 'Furgoneta Barcelona-01',
    type: 'van',
    status: 'active',
    driver: 'Ana García',
    fuelLevel: 65,
    location: { lat: 41.3851, lng: 2.1734 }, // Barcelona
    position: [41.3851, 2.1734],
    nextMaintenance: '2023-08-20',
    currentDelivery: '2'
  },
  {
    id: '3',
    name: 'Camión Valencia-01',
    type: 'truck',
    status: 'maintenance',
    driver: 'Miguel Fernández',
    fuelLevel: 25,
    location: { lat: 39.4699, lng: -0.3763 }, // Valencia
    position: [39.4699, -0.3763],
    nextMaintenance: '2023-07-30',
    currentDelivery: null
  },
  {
    id: '4',
    name: 'Coche Sevilla-01',
    type: 'car',
    status: 'active',
    driver: 'Laura Martínez',
    fuelLevel: 90,
    location: { lat: 37.3891, lng: -5.9845 }, // Sevilla
    position: [37.3891, -5.9845],
    nextMaintenance: '2023-09-05',
    currentDelivery: '3'
  },
  {
    id: '5',
    name: 'Furgoneta Bilbao-01',
    type: 'van',
    status: 'inactive',
    driver: 'Javier López',
    fuelLevel: 10,
    location: { lat: 43.2630, lng: -2.9350 }, // Bilbao
    position: [43.2630, -2.9350],
    nextMaintenance: '2023-08-10',
    currentDelivery: null
  },
  {
    id: '6',
    name: 'Coche Málaga-01',
    type: 'car',
    status: 'active',
    driver: 'Elena Sánchez',
    fuelLevel: 75,
    location: { lat: 36.7213, lng: -4.4214 }, // Málaga
    position: [36.7213, -4.4214],
    nextMaintenance: '2023-09-25',
    currentDelivery: '4'
  },
  {
    id: '7',
    name: 'Camión Zaragoza-01',
    type: 'truck',
    status: 'active',
    driver: 'David Pérez',
    fuelLevel: 55,
    location: { lat: 41.6488, lng: -0.8891 }, // Zaragoza
    position: [41.6488, -0.8891],
    nextMaintenance: '2023-08-15',
    currentDelivery: '5'
  }
];

// Entregas con rutas en España
export const deliveries: Delivery[] = [
  {
    id: '1',
    vehicleId: '1',
    status: 'in-progress',
    destination: 'Toledo',
    customer: 'Supermercados Toledo S.A.',
    estimatedArrival: '2023-07-25T14:30:00',
    items: [
      { name: 'Productos alimenticios', quantity: 120 },
      { name: 'Bebidas', quantity: 80 }
    ],
    route: [
      [40.4168, -3.7038], // Madrid (inicio)
      [40.3600, -3.7100], // Punto intermedio 1
      [40.3000, -3.8000], // Punto intermedio 2
      [40.2500, -3.9000], // Punto intermedio 3
      [39.8628, -4.0273]  // Toledo (destino)
    ]
  },
  {
    id: '2',
    vehicleId: '2',
    status: 'in-progress',
    destination: 'Tarragona',
    customer: 'Distribuidora Mediterránea',
    estimatedArrival: '2023-07-25T16:45:00',
    items: [
      { name: 'Electrónica', quantity: 45 },
      { name: 'Accesorios', quantity: 30 }
    ],
    route: [
      [41.3851, 2.1734], // Barcelona (inicio)
      [41.3500, 2.0000], // Punto intermedio 1
      [41.2500, 1.8000], // Punto intermedio 2
      [41.1500, 1.5000], // Punto intermedio 3
      [41.1187, 1.2445]  // Tarragona (destino)
    ]
  },
  {
    id: '3',
    vehicleId: '4',
    status: 'in-progress',
    destination: 'Córdoba',
    customer: 'Tiendas Andaluzas S.L.',
    estimatedArrival: '2023-07-25T15:15:00',
    items: [
      { name: 'Ropa', quantity: 65 },
      { name: 'Calzado', quantity: 40 }
    ],
    route: [
      [37.3891, -5.9845], // Sevilla (inicio)
      [37.5000, -5.8000], // Punto intermedio 1
      [37.7000, -5.5000], // Punto intermedio 2
      [37.8000, -5.0000], // Punto intermedio 3
      [37.8882, -4.7794]  // Córdoba (destino)
    ]
  },
  {
    id: '4',
    vehicleId: '6',
    status: 'in-progress',
    destination: 'Granada',
    customer: 'Hoteles Costa del Sol',
    estimatedArrival: '2023-07-25T17:30:00',
    items: [
      { name: 'Productos de limpieza', quantity: 50 },
      { name: 'Amenities', quantity: 100 }
    ],
    route: [
      [36.7213, -4.4214], // Málaga (inicio)
      [36.8000, -4.3000], // Punto intermedio 1
      [36.9000, -4.1000], // Punto intermedio 2
      [37.0000, -3.9000], // Punto intermedio 3
      [37.1773, -3.5986]  // Granada (destino)
    ]
  },
  {
    id: '5',
    vehicleId: '7',
    status: 'in-progress',
    destination: 'Pamplona',
    customer: 'Distribuidora Norte',
    estimatedArrival: '2023-07-25T18:00:00',
    items: [
      { name: 'Material de construcción', quantity: 80 },
      { name: 'Herramientas', quantity: 25 }
    ],
    route: [
      [41.6488, -0.8891], // Zaragoza (inicio)
      [41.8000, -1.0000], // Punto intermedio 1
      [42.0000, -1.3000], // Punto intermedio 2
      [42.3000, -1.5000], // Punto intermedio 3
      [42.8125, -1.6458]  // Pamplona (destino)
    ]
  },
  {
    id: '6',
    vehicleId: null,
    status: 'pending',
    destination: 'Murcia',
    customer: 'Fruterías Levante',
    estimatedArrival: '2023-07-26T09:00:00',
    items: [
      { name: 'Frutas', quantity: 200 },
      { name: 'Verduras', quantity: 150 }
    ],
    route: null
  },
  {
    id: '7',
    vehicleId: null,
    status: 'pending',
    destination: 'Oviedo',
    customer: 'Supermercados Asturianos',
    estimatedArrival: '2023-07-26T11:30:00',
    items: [
      { name: 'Lácteos', quantity: 90 },
      { name: 'Congelados', quantity: 60 }
    ],
    route: null
  }
];

// Función para obtener las entregas de un vehículo
export const getVehicleDeliveries = (vehicleId: string): Delivery[] => {
  return deliveries.filter(delivery => delivery.vehicleId === vehicleId);
};

// Función para obtener la entrega actual de un vehículo
export const getCurrentDelivery = (vehicleId: string): Delivery | null => {
  return deliveries.find(delivery => delivery.vehicleId === vehicleId && delivery.status === 'in-progress') || null;
};

// Función para actualizar los datos de los vehículos con sus entregas actuales
export const updateVehiclesWithDeliveries = () => {
  // No modificamos los vehículos originales, solo los usamos como referencia
  return vehicles;
};