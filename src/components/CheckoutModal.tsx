// CheckoutModal.tsx - Generated with current configuration
// Last updated: 2025-08-20T08:01:09.836Z

import React, { useState } from 'react';
import { X, MapPin, User, Phone, MessageCircle } from 'lucide-react';

export interface OrderData {
  items: Array<{
    title: string;
    type: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  deliveryFee: number;
  finalTotal: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  deliveryZone: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: OrderData;
  onConfirmOrder: (customerInfo: CustomerInfo) => void;
}

// Current delivery zones
const DELIVERY_ZONES = {
  'Santiago de Cuba > Santiago de Cuba > Nuevo Vista Alegre': 150,
  'Santiago de Cuba > Santiago de Cuba > Vista Alegre': 350
};

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, orderData, onConfirmOrder }) => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    deliveryZone: ''
  });

  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Partial<CustomerInfo> = {};
    
    if (!customerInfo.name.trim()) newErrors.name = 'Nombre es requerido';
    if (!customerInfo.phone.trim()) newErrors.phone = 'Teléfono es requerido';
    if (!customerInfo.address.trim()) newErrors.address = 'Dirección es requerida';
    if (!customerInfo.deliveryZone) newErrors.deliveryZone = 'Zona de entrega es requerida';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onConfirmOrder(customerInfo);
    }
  };

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Finalizar Pedido</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Order Summary */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-3">Resumen del Pedido</h3>
            {orderData.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm mb-2">
                <span>{item.title} x{item.quantity}</span>
                <span>${item.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${orderData.total}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Entrega:</span>
                <span>${orderData.deliveryFee}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${orderData.finalTotal}</span>
              </div>
            </div>
          </div>

          {/* Customer Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <User size={16} className="inline mr-1" />
                Nombre Completo
              </label>
              <input
                type="text"
                value={customerInfo.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Tu nombre completo"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Phone size={16} className="inline mr-1" />
                Teléfono
              </label>
              <input
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Tu número de teléfono"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin size={16} className="inline mr-1" />
                Zona de Entrega
              </label>
              <select
                value={customerInfo.deliveryZone}
                onChange={(e) => handleInputChange('deliveryZone', e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.deliveryZone ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecciona tu zona</option>
                {Object.entries(DELIVERY_ZONES).map(([zone, fee]) => (
                  <option key={zone} value={zone}>
                    {zone} (+${fee} entrega)
                  </option>
                ))}
              </select>
              {errors.deliveryZone && <p className="text-red-500 text-sm mt-1">{errors.deliveryZone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin size={16} className="inline mr-1" />
                Dirección Exacta
              </label>
              <textarea
                value={customerInfo.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Dirección completa con referencias"
                rows={3}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                Confirmar Pedido
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;