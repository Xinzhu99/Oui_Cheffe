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

    //appel api route/grog pour envoyer le texte de transcription
    try {
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcript: text,
        }),
      });

      const data = await res.json();

      //gestion d'erreur
      if (!res.ok) {
        setError(data.error || "Une erreur est survenue");
      } else {
      //en cas de succès, stocker le data dans result
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
    <div className="p-3 m-2">
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block mb-2 font-bold">
            Colle la transcription d'une vidéo de recette :
          </label>

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
          className="px-6 p-3 text-base font-bold text-white border-none rounded-lg bg-orange-400"
        >
          {loading ? "⏳ Analyse en cours..." : "Générer la recette"}
        </button>
      </form>

      {/* Affichage des erreurs */}
      {error && (
        <div className="mt-5 p-5 bg-red-100 rounded-lg text-red-600 border-2 border-red-300">
          <strong>❌ Erreur :</strong> {error}
        </div>
      )}

      {/* Le modal */}
      {result && <RecipeModal recipe={result} />}


    </div>
  );
}
