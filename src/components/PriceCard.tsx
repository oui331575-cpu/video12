// PriceCard.tsx - Generated with current configuration
// Last updated: 2025-08-20T08:01:09.836Z

import React from 'react';
import { useAdmin } from '../context/AdminContext';

interface PriceCardProps {
  type: 'movie' | 'tv';
  selectedSeasons?: number[];
  isAnime?: boolean;
}

export function PriceCard({ type, selectedSeasons = [], isAnime = false }: PriceCardProps) {
  const { config } = useAdmin();

  const calculatePrice = () => {
    if (type === 'movie') {
      return config.moviePrice;
    } else {
      const seasonCount = selectedSeasons.length || 1;
      return seasonCount * config.seriesPrice;
    }
  };

  const basePrice = calculatePrice();
  const transferPrice = Math.round(basePrice * (1 + config.transferFee / 100));

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200 shadow-sm">
      <div className="text-center">
        <div className="flex items-center justify-center mb-3">
          <div className="bg-green-100 p-2 rounded-lg mr-2">
            <span className="text-lg">{type === 'movie' ? '🎬' : '📺'}</span>
          </div>
          <h4 className="font-bold text-green-900">
            {type === 'movie' ? 'Película' : 'Serie'}
            {isAnime && ' (Anime)'}
          </h4>
        </div>
        
        {type === 'tv' && selectedSeasons.length > 0 && (
          <div className="mb-3">
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
              {selectedSeasons.length} temporada{selectedSeasons.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}
        
        <div className="space-y-3">
          <div className="bg-green-100 rounded-lg p-3 border border-green-300">
            <div className="text-sm font-medium text-green-700 mb-1">Efectivo</div>
            <div className="text-xl font-bold text-green-800">${basePrice.toLocaleString()} CUP</div>
          </div>
          
          <div className="bg-orange-100 rounded-lg p-3 border border-orange-300">
            <div className="text-sm font-medium text-orange-700 mb-1">Transferencia (+{config.transferFee}%)</div>
            <div className="text-xl font-bold text-orange-800">${transferPrice.toLocaleString()} CUP</div>
          </div>
        </div>
        
        {type === 'tv' && (
          <div className="mt-3 text-xs text-gray-600">
            Precio por temporada: ${config.seriesPrice.toLocaleString()} CUP
          </div>
        )}
      </div>
    </div>
  );
}