export interface Vehicle {
  id: string;
  name: string;
  type: 'truck' | 'van' | 'car';
  status: 'active' | 'maintenance' | 'inactive';
  location: {
    lat: number;
    lng: number;
  };
  position?: [number, number]; // Coordenadas para el mapa [latitud, longitud]
  driver: string;
  fuelLevel: number;
  nextMaintenance: string;
  currentDelivery?: string | null;
}

export interface DeliveryItem {
  name: string;
  quantity: number;
}

export interface Delivery {
  id: string;
  vehicleId: string | null;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
  destination: string;
  estimatedArrival?: string;
  customer: string;
  items?: DeliveryItem[];
  route?: [number, number][] | null; // Array de coordenadas para la ruta
}