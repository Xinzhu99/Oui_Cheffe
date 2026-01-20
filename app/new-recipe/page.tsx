import HeaderWrapper from "../components/HeaderWrapper";
import GroqForm from "../components/recipes/GroqForm";

export default function TestPage (){
    return(
        <div className="pb-32">
            <HeaderWrapper header="Proposer une recette" text="Générez votre recette avec l'IA" />
            
            <GroqForm />
        </div>
    )
}