// APRÈS ✅
"use client";
import { abandonList } from "@/app/actions/shoppingList";
import { useState } from "react";

export default function AbandonList() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    const confirmed = window.confirm(
      "⚠️ Es-tu sûr.e de vouloir abandonner ta liste ?\n\nToutes tes courses seront supprimées."
    );

    if (!confirmed) return;

    setIsLoading(true);
    await abandonList();
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`
        px-6 py-4 rounded-2xl font-bold transition-all active:scale-98
        ${
          isLoading
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-white text-red-500 border-2 border-red-500 hover:bg-red-50'
        }
      `}
      style={{
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="inline-block animate-spin">⏳</span>
          <span>Suppression...</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          Abandonner
        </span>
      )}
    </button>
  );
}
