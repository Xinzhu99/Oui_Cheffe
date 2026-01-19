import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server"

export  async function POST (request) {
    try {
        //récupérer le transcript via request
        const { transcript} = await request.json();
       
         if (!transcript || transcript.trim().length === 0){
            return NextResponse.json (
                {error: "La transcription est vide"},
                {status: 404}
            )
        }
        
        console.log("Transcription", transcript.substring(0,100) + "...");

        //initialiser gen AI
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
        const model = genAI.getGenerativeModel({model:"gemini-pro"})

        //créer le promt 
        const promt = `
        Tu es un expert culinaire. Analyse cette transcription de vidéo de recette et détermine le TYPE DE PLAT.

Les catégories possibles sont :
- Entrées
- Plats principaux
- Desserts
- Petit-déjeuner
- Apéritifs

Réponds UNIQUEMENT avec le nom de la catégorie, sans explication.

Transcription :
${transcript}`.trim()

        //appeler gemini pour générer une reponse
        const result = await model.generateContent(promt)
        const response = await result.response
        const dishTYpe = response.text().trim()

        ConsoleLogWriter("réponse de l'IA", dishTYpe)

        //retourner une reponse
        return NextResponse.json({
            success: true,
            dishTYpe: dishTYpe
        })
    } catch (error) {
        console.error("erreur", error)
        return NextResponse.json(
            {error: "Erreur lors de l'appel Gemini" + error.message}
            {status: 500}
        )
    }
}