"use client";

import addToShoppingList from "@/app/actions/shoppingList";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function CreateList() {
  const [message, setMessage] = useState("");
  //fonction pour ajouter des ingrédients dans ma shoopng list
  const handleClick = async () => {
    const result = await addToShoppingList();
    console.log("✨", result);
    setMessage(result.message);

    setTimeout(() => {
      redirect("/my-list");
    }, 1000);
  };
  return (
    <div
      className="fixed bottom-16 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-50"
      style={{ boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.05)" }}
    >
      {/* Message de succès */}
      {message && (
        <div className="mb-3 p-4 bg-green-50 rounded-2xl border-2 border-green-200">
          <div className="flex items-center gap-3">
            <p
              className="text-sm text-green-800 font-semibold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {message}
            </p>
          </div>
        </div>
      )}

      <button
        onClick={() => handleClick()}
        className="w-full px-6 py-4 rounded-2xl font-bold text-white transition-all active:scale-98"
        style={{
          background: "linear-gradient(135deg, #FF8C61, #FF6B35)",
          boxShadow: "0 8px 24px rgba(255, 107, 53, 0.15)",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        <span className="flex items-center justify-center gap-2">
          Créer ma liste de courses
        </span>
      </button>
    </div>
  );
}
