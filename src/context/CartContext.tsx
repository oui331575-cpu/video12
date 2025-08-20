import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAdmin } from './AdminContext';

interface CartItem {
  id: string;
  title: string;
  type: 'movie' | 'tv' | 'anime';
  price: number;
  poster?: string;
  paymentType?: 'cash' | 'transfer';
  selectedSeasons?: number[];
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction = 
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'UPDATE_PAYMENT_TYPE'; payload: { id: string; paymentType: 'cash' | 'transfer' } }
  | { type: 'UPDATE_SEASONS'; payload: { id: string; selectedSeasons: number[] } }
  | { type: 'UPDATE_TOTAL' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, paymentType: 'cash' }]
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'UPDATE_PAYMENT_TYPE':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, paymentType: action.payload.paymentType }
            : item
        )
      };
    case 'UPDATE_SEASONS':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, selectedSeasons: action.payload.selectedSeasons }
            : item
        )
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  updatePaymentType: (id: string, paymentType: 'cash' | 'transfer') => void;
  updateSeasons: (id: string, selectedSeasons: number[]) => void;
  getItemSeasons: (id: string) => number[];
  calculateItemPrice: (item: CartItem) => number;
  calculateTotalPrice: () => number;
  calculateTotalByPaymentType: (paymentType: 'cash' | 'transfer') => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { config } = useAdmin();
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0
  });

  const addItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const isInCart = (id: string): boolean => {
    return state.items.some(item => item.id === id);
  };

  const updatePaymentType = (id: string, paymentType: 'cash' | 'transfer') => {
    dispatch({ type: 'UPDATE_PAYMENT_TYPE', payload: { id, paymentType } });
  };

  const updateSeasons = (id: string, selectedSeasons: number[]) => {
    dispatch({ type: 'UPDATE_SEASONS', payload: { id, selectedSeasons } });
  };

  const getItemSeasons = (id: string): number[] => {
    const item = state.items.find(item => item.id === id);
    return item?.selectedSeasons || [];
  };

  const calculateItemPrice = (item: CartItem): number => {
    let basePrice = 0;
    
    if (item.type === 'movie') {
      basePrice = config.moviePrice;
    } else {
      const seasonCount = item.selectedSeasons?.length || 1;
      basePrice = seasonCount * config.seriesPrice;
    }

    if (item.paymentType === 'transfer') {
      return Math.round(basePrice * (1 + config.transferFee / 100));
    }

    return basePrice;
  };

  const calculateTotalPrice = (): number => {
    return state.items.reduce((total, item) => total + calculateItemPrice(item), 0);
  };

  const calculateTotalByPaymentType = (paymentType: 'cash' | 'transfer'): number => {
    return state.items
      .filter(item => item.paymentType === paymentType)
      .reduce((total, item) => total + calculateItemPrice(item), 0);
  };

  // Calculate total whenever items change
  useEffect(() => {
    const total = calculateTotalPrice();
    // Note: We don't dispatch UPDATE_TOTAL as it's calculated dynamically
  }, [state.items, config]);

  return (
    <CartContext.Provider value={{ 
      state, 
      addItem, 
      removeItem, 
      clearCart, 
      isInCart,
      updatePaymentType,
      updateSeasons,
      getItemSeasons,
      calculateItemPrice,
      calculateTotalPrice,
      calculateTotalByPaymentType
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}