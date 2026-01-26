// "use client";
import HeaderWrapper from "../components/HeaderWrapper";
import GroqForm from "../components/recipes/GroqForm";
import RecipeModalBis from "../components/recipes/RecipeModalBis";

export default function TestPage() {

  return (
      <div className="pb-32">
        <HeaderWrapper
          header="Proposer une recette"
          text="Générez votre recette avec l'IA"
        />

        <GroqForm  />
        {/* <RecipeModalBis /> */}
      </div>
  );
}
