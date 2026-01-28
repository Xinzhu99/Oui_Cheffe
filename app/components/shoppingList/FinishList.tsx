"use client";
import { abandonList } from "@/app/actions/shoppingList";
import { useState } from "react";

export default function FinishList() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    const confirmed = window.confirm(
      "⚠️ Es-tu sûr.e d'avoir terminé tes courses ?\n\nLa liste sera supprimée.",
    );

    if (!confirmed) return;

    setIsLoading(true);

    await abandonList(); // ← La redirection se fait automatiquement
  };

  return (
    <div className="fixed bottom-16 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-50"
          style={{ boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.05)" }}>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`
        w-full px-6 py-4 rounded-2xl font-bold text-white transition-all disabled:opacity-50
      `}
        style={{
          background: isLoading
            ? "#10B981"
            : "linear-gradient(135deg, #FF8C61, #FF6B35)",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        {isLoading ? "⏳ Suppression..." : "J'ai terminé mes courses"}
      </button>
    </div>
  );
}
