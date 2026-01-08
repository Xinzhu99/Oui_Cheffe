"use client"
import { abandonList } from "@/app/actions/shoppingList"
import { useState } from "react"

export default function AbandonList() {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    const confirmed = window.confirm(
      "⚠️ Êtes-vous sûr de vouloir abandonner votre liste ?\n\nToutes vos courses seront supprimées."
    )

    if (!confirmed) return

    setIsLoading(true)
    
    await abandonList()  // ← La redirection se fait automatiquement
    
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`
        p-2 text-white font-extrabold rounded-2xl w-full
        transition-all
        ${isLoading 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-red-500 hover:bg-red-600 cursor-pointer'
        }
      `}
    >
      {isLoading ? "⏳ Suppression..." : "Abandonner"}
    </button>
  )
}