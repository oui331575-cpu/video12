import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface PriceConfig {
  moviePrice: number;
  seriesPrice: number;
  transferFeePercentage: number;
  novelPricePerChapter: number;
}

interface DeliveryZone {
  id: string;
  name: string;
  cost: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Novel {
  titulo: string;
  genero: string;
  capitulos: number;
  año: number;
  descripcion: string;
  active: boolean;
  id: number;
  createdAt: string;
  updatedAt: string;
}

interface AdminState {
  priceConfig: PriceConfig;
  deliveryZones: DeliveryZone[];
  novels: Novel[];
}

type AdminAction = 
  | { type: 'UPDATE_PRICES'; payload: PriceConfig }
  | { type: 'ADD_DELIVERY_ZONE'; payload: DeliveryZone }
  | { type: 'UPDATE_DELIVERY_ZONE'; payload: DeliveryZone }
  | { type: 'DELETE_DELIVERY_ZONE'; payload: string }
  | { type: 'ADD_NOVEL'; payload: Novel }
  | { type: 'UPDATE_NOVEL'; payload: Novel }
  | { type: 'DELETE_NOVEL'; payload: number };

const adminReducer = (state: AdminState, action: AdminAction): AdminState => {
  switch (action.type) {
    case 'UPDATE_PRICES':
      return {
        ...state,
        priceConfig: action.payload
      };
    case 'ADD_DELIVERY_ZONE':
      return {
        ...state,
        deliveryZones: [...state.deliveryZones, action.payload]
      };
    case 'UPDATE_DELIVERY_ZONE':
      return {
        ...state,
        deliveryZones: state.deliveryZones.map(zone => 
          zone.id === action.payload.id ? action.payload : zone
        )
      };
    case 'DELETE_DELIVERY_ZONE':
      return {
        ...state,
        deliveryZones: state.deliveryZones.filter(zone => zone.id !== action.payload)
      };
    case 'ADD_NOVEL':
      return {
        ...state,
        novels: [...state.novels, action.payload]
      };
    case 'UPDATE_NOVEL':
      return {
        ...state,
        novels: state.novels.map(novel => 
          novel.id === action.payload.id ? action.payload : novel
        )
      };
    case 'DELETE_NOVEL':
      return {
        ...state,
        novels: state.novels.filter(novel => novel.id !== action.payload)
      };
    default:
      return state;
  }
};

interface AdminContextType {
  state: AdminState;
  updatePrices: (prices: PriceConfig) => void;
  addDeliveryZone: (zone: DeliveryZone) => void;
  updateDeliveryZone: (zone: DeliveryZone) => void;
  deleteDeliveryZone: (id: string) => void;
  addNovel: (novel: Novel) => void;
  updateNovel: (novel: Novel) => void;
  deleteNovel: (id: number) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Current delivery zones configuration
const initialDeliveryZones: DeliveryZone[] = [
  {
    "id": "1",
    "name": "Santiago de Cuba > Santiago de Cuba > Nuevo Vista Alegre",
    "cost": 150,
    "active": true,
    "createdAt": "2025-08-20T07:57:35.826Z",
    "updatedAt": "2025-08-20T07:59:08.460Z"
  },
  {
    "id": "2",
    "name": "Santiago de Cuba > Santiago de Cuba > Vista Alegre",
    "cost": 350,
    "active": true,
    "createdAt": "2025-08-20T07:57:35.826Z",
    "updatedAt": "2025-08-20T08:00:33.859Z"
  }
];

// Current novels configuration  
const initialNovels: Novel[] = [
  {
    "titulo": "pepe",
    "genero": "drama",
    "capitulos": 100,
    "año": 2025,
    "descripcion": "",
    "active": true,
    "id": 1755676806060,
    "createdAt": "2025-08-20T08:00:06.060Z",
    "updatedAt": "2025-08-20T08:00:06.060Z"
  }
];

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(adminReducer, {
    priceConfig: {
      moviePrice: 80,
      seriesPrice: 300,
      transferFeePercentage: 10,
      novelPricePerChapter: 5
    },
    deliveryZones: initialDeliveryZones,
    novels: initialNovels
  });

  const updatePrices = (prices: PriceConfig) => {
    dispatch({ type: 'UPDATE_PRICES', payload: prices });
  };

  const addDeliveryZone = (zone: DeliveryZone) => {
    dispatch({ type: 'ADD_DELIVERY_ZONE', payload: zone });
  };

  const updateDeliveryZone = (zone: DeliveryZone) => {
    dispatch({ type: 'UPDATE_DELIVERY_ZONE', payload: zone });
  };

  const deleteDeliveryZone = (id: string) => {
    dispatch({ type: 'DELETE_DELIVERY_ZONE', payload: id });
  };

  const addNovel = (novel: Novel) => {
    dispatch({ type: 'ADD_NOVEL', payload: novel });
  };

  const updateNovel = (novel: Novel) => {
    dispatch({ type: 'UPDATE_NOVEL', payload: novel });
  };

  const deleteNovel = (id: number) => {
    dispatch({ type: 'DELETE_NOVEL', payload: id });
  };

  return (
    <AdminContext.Provider value={{
      state,
      updatePrices,
      addDeliveryZone,
      updateDeliveryZone,
      deleteDeliveryZone,
      addNovel,
      updateNovel,
      deleteNovel
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}