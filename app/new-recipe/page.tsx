// "use client";
import HeaderWrapper from "../components/HeaderWrapper";
import GroqForm from "../components/recipes/GroqForm";

export default function TestPage() {
  return (
    <div className="pb-20">
      <HeaderWrapper
        header="Tu veux proposer une recette ?"
        text="Génère ta recette avec l'IA Gen!"
      />
      <GroqForm />
    </div>
  );
}