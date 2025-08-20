// NovelasModal.tsx - Generated with current configuration
// Last updated: 2025-08-20T08:01:09.836Z

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

// Current novels catalog
const defaultNovelas = [
  {
    "id": 1755676806060,
    "titulo": "pepe",
    "genero": "drama",
    "capitulos": 100,
    "año": 2025,
    "descripcion": ""
  }
];

// Current novel pricing
const novelPricePerChapter = 5;

interface NovelasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NovelasModal: React.FC<NovelasModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Novelas Disponibles</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4">
          {defaultNovelas.map((novela) => (
            <div key={novela.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 capitalize">{novela.titulo}</h3>
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Género:</span> {novela.genero}</p>
                <p><span className="font-medium">Capítulos:</span> {novela.capitulos}</p>
                <p><span className="font-medium">Año:</span> {novela.año}</p>
                <p><span className="font-medium">Precio por capítulo:</span> ${novelPricePerChapter}</p>
                <p><span className="font-medium">Precio total:</span> ${novela.capitulos * novelPricePerChapter}</p>
              </div>
              {novela.descripcion && (
                <p className="mt-2 text-gray-700">{novela.descripcion}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NovelasModal;