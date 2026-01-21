"use client";
import { useState } from "react";
import HeaderWrapper from "../components/HeaderWrapper";
import GroqForm from "../components/recipes/GroqForm";
import RecipeModal from "../components/recipes/RecipeModal";

export default function TestPage() {
  const [result, setResult] = useState<any>(null);

  return (
    <>
      <div className="pb-32">
        <HeaderWrapper
          header="Proposer une recette"
          text="Générez votre recette avec l'IA"
        />

        <GroqForm onRecipeGenerated={setResult} />
      </div>
      {/* Le modal est rendu ICI, au niveau de la page */}
      {result && (
        <RecipeModal recipe={result} onClose={() => setResult(null)} />
      )}
    </>
  );
}
