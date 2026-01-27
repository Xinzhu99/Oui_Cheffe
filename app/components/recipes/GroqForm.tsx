"use client";

import { useState } from "react";
import RecipeModal from "./RecipeModal";

export default function GroqForm() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Appel api route/groq pour envoyer le texte de transcription
    try {
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcript: text,
        }),
      });

      const data = await res.json();

      // Gestion d'erreur
      if (!res.ok) {
        setError(data.error || "Une erreur est survenue");
      } else {
        // En cas de succès, stocker le data dans result
        setResult(data.recipe);
        console.log("✅ Résultat complet:", data.recipe);
      }
    } catch (error) {
      console.error("❌ Erreur:", error);
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5 py-4">
      {/* Formulaire avec design moderne */}
      <form 
        onSubmit={handleSubmit}
        className="gap-4 flex flex-col p-6 transition-all duration-300"
        
      >
          {/* Textarea avec style orange */}
          <textarea
            className="w-full p-4 rounded-2xl border-2 border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Colle la transcription d'une vidéo de recette :"
            required
            rows={10}
            style={{ 
              fontFamily: "'Montserrat', sans-serif",
              resize: 'vertical',
            }}
          />


        {/* Bouton submit avec gradient orange */}
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="mt-4 w-full px-6 py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: loading || !text.trim() 
              ? '#D1D5DB' 
              : 'linear-gradient(135deg, #FF8C61, #FF6B35)',
            boxShadow: loading || !text.trim() 
              ? 'none' 
              : '0 8px 24px rgba(255, 107, 53, 0.15)',
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block animate-spin">⏳</span>
              <span>Analyse en cours...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span>✨</span>
              <span>Générer la recette</span>
            </span>
          )}
        </button>

        
      </form>

      {/* Affichage des erreurs avec design moderne */}
      {error && (
        <div 
          className="mt-5 p-5 bg-red-50 rounded-2xl border-2 border-red-200"
          style={{
            animation: 'fadeInUp 0.4s ease-out backwards',
          }}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">❌</span>
            <div>
              <strong 
                className="block text-red-900 mb-1"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Erreur
              </strong>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Message de succès
      {result && !error && (
        <div 
          className="mt-5 p-5 bg-green-50 rounded-2xl border-2 border-green-200"
          style={{
            animation: 'fadeInUp 0.4s ease-out backwards',
          }}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <strong 
                className="block text-green-900 mb-1"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Recette générée avec succès !
              </strong>
              <p className="text-sm text-green-700">
                Ta recette est prête. Tu peux maintenant la consulter ci-dessous.
              </p>
            </div>
          </div>
        </div>
      )} */}

      {/* Le modal */}
      {result && <RecipeModal recipe={result} />}
    </div>
  );
}