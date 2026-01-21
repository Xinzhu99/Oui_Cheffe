"use client"
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

interface RecipeModalProps {
  recipe: any;
  onClose: () => void;
}

export default function RecipeModal({ recipe, onClose }: RecipeModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px',
        overflowY: 'auto'
      }}
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl my-8 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full text-xl font-bold text-gray-600 flex items-center justify-center transition-colors"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          ✅ Recette générée !
        </h2>
        
        <div className="space-y-4">
          <p className="text-xl">
            <strong>Nom :</strong> {recipe.dish?.name}
          </p>
          
          <p>
            <strong>Temps :</strong> {recipe.dish?.prep_time} minutes
          </p>
          
          <p>
            <strong>Catégorie :</strong> {recipe.dish?.category}
          </p>
          
          <div>
            <strong>Instructions :</strong>
            <p className="mt-2 text-gray-700">{recipe.dish?.instructions}</p>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-bold transition-colors"
          >
            Annuler
          </button>
          <button
            type="button"
            className="flex-1 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold transition-colors"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}