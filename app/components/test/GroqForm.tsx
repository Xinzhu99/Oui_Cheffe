"use client"

import { useState } from "react";

export default function GroqForm() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Réinitialiser les états
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/groq", {  // ✅ URL relative
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcript: text
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        // Gérer les erreurs HTTP
        setError(data.error || "Une erreur est survenue");
      } else {
        // Afficher le résultat
        setResult(data.recipe.dish.instructions);
        console.log("✅ Résultat:", data);
      }
      
    } catch (error) {
      console.error("❌ Erreur:", error);
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🧪 Proposer une recette avec l'IA Gen</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-10px">
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
            Colle la transcription d'une vidéo de recette :
          </label>
          
          {/* ✅ Utiliser textarea au lieu d'input */}
          <textarea
            className="w-full p-3 border-2 border-amber-500 bg-amber-100 rounded"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Exemple : Bonjour, aujourd'hui on va faire des pâtes carbonara..."
            required
            rows={10}
          />
        </div>
        
        <button 
          type="submit"
          disabled={loading || !text.trim()}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: loading ? '#ccc' : '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '⏳ Analyse en cours...' : '🚀 Générer la recette'}
        </button>
      </form>

      {/* Affichage des erreurs */}
      {error && (
        <div style={{ 
          marginTop: '20px', 
          padding: '20px', 
          backgroundColor: '#fee2e2', 
          borderRadius: '8px',
          color: '#dc2626',
          border: '2px solid #fca5a5'
        }}>
          <strong>❌ Erreur :</strong> {error}
        </div>
      )}

      {/* Affichage du résultat */}
      {result && (
        <div style={{ 
          marginTop: '20px', 
          padding: '20px', 
          backgroundColor: '#d1fae5', 
          borderRadius: '8px',
          border: '2px solid #6ee7b7'
        }}>
          <h2 style={{ marginBottom: '10px' }}>✅ Résultat de l'analyse</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669' }}>
            Recette : <strong>{result}</strong>
          </p>
        </div>
      )}
    </div>
  );
}