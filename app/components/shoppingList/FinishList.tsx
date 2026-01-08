"use client"
import { abandonList } from "@/app/actions/shoppingList"
import { useState } from "react"

export default function FinishList() {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    const confirmed = window.confirm(
      "⚠️ Êtes-vous sûr d'avoir terminé vos courses ?\n\nLa liste sera supprimée."
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
        p-2 m-4 text-white font-extrabold rounded-2xl sticky bottom-2 
        transition-all
        ${isLoading 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-orange-400 hover:bg-orange-600 cursor-pointer'
        }
      `}
    >
      {isLoading ? "⏳ Suppression..." : "✅ J'ai terminé mes courses"}
    </button>
  )
}