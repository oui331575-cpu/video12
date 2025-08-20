import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

// Current system configuration
const SYSTEM_CONFIG = {
  prices: {
    "moviePrice": 80,
    "seriesPrice": 300,
    "transferFeePercentage": 10,
    "novelPricePerChapter": 5
  },
  deliveryZones: 2,
  novels: 1,
  lastBackup: 'null'
};

export function AdminPanel() {
  const { state } = useAdmin();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Panel de Administración</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'overview'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Resumen
            </button>
            <button
              onClick={() => setActiveTab('prices')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'prices'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Precios
            </button>
            <button
              onClick={() => setActiveTab('zones')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'zones'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Zonas de Entrega
            </button>
            <button
              onClick={() => setActiveTab('novels')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'novels'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Novelas
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900">Precio Películas</h3>
                <p className="text-2xl font-bold text-blue-600">${state.priceConfig.moviePrice}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900">Precio Series</h3>
                <p className="text-2xl font-bold text-green-600">${state.priceConfig.seriesPrice}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-900">Zonas de Entrega</h3>
                <p className="text-2xl font-bold text-purple-600">{state.deliveryZones.length}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-orange-900">Novelas</h3>
                <p className="text-2xl font-bold text-orange-600">{state.novels.length}</p>
              </div>
            </div>
          )}

          {activeTab === 'prices' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Configuración de Precios</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Precio Películas</label>
                  <input
                    type="number"
                    value={state.priceConfig.moviePrice}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Precio Series</label>
                  <input
                    type="number"
                    value={state.priceConfig.seriesPrice}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    readOnly
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'zones' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Zonas de Entrega</h2>
              <div className="space-y-2">
                {state.deliveryZones.map((zone) => (
                  <div key={zone.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{zone.name}</p>
                      <p className="text-sm text-gray-600">Costo: ${zone.cost}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      zone.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {zone.active ? 'Activa' : 'Inactiva'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'novels' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Novelas</h2>
              <div className="space-y-2">
                {state.novels.map((novel) => (
                  <div key={novel.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{novel.titulo}</p>
                      <p className="text-sm text-gray-600">
                        {novel.genero} • {novel.capitulos} capítulos • {novel.año}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      novel.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {novel.active ? 'Activa' : 'Inactiva'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}