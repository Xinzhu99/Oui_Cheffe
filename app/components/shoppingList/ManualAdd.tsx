// APRÈS ✅
"use client";
import { addToCustomized } from "@/app/actions/customized";
import { useState } from "react";

export default function ManualAdd() {
  const [input, setInput] = useState("");

  const handleClick = async () => {
    if (!input.trim()) return;
    
    await addToCustomized(input);
    setInput("");
    
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div className="mb-4">
      {/* Input + Bouton */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Ex: bananes, yaourt..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        />
        <button
          onClick={handleClick}
          disabled={!input.trim()}
          className="w-12 h-12 flex items-center justify-center rounded-xl text-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: input.trim()
              ? 'linear-gradient(135deg, #FF8C61, #FF6B35)'
              : '#D1D5DB',
            boxShadow: input.trim() ? '0 4px 12px rgba(255, 107, 53, 0.15)' : 'none',
          }}
          title="Ajouter"
        >
          ➕
        </button>
      </div>

     
    </div>
  );
}