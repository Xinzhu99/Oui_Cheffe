
import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';
import { db } from "@/lib/db/drizzle";
import { dish_categories, ingredient_categories } from "@/lib/db/schema";

export async function POST(request) {
  try {

    //1. récupérer la transcription du texte 
    const { transcript } = await request.json();
    
    if (!transcript || transcript.trim().length === 0) {
      return NextResponse.json(
        { error: "La transcription est vide" },
        { status: 400 }
      );
    }
    
    console.log('📝 Transcription reçue (longueur):', transcript.length, 'caractères');
    console.log('🔑 Clé API GROQ présente ?', !!process.env.GROQ_API_KEY);
    
    //2. Initialiser GROQ
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });

    //récupérer les catégories dans ma BDD
    let existing_dish_cats = []
    let existing_ingredient_cats = []
    const dishCats = await db.select().from(dish_categories)
    existing_dish_cats = dishCats.map(cat=> cat.name)

    const ingredientCats = await db.select().from(ingredient_categories)
    existing_ingredient_cats = ingredientCats.map(cat=>cat.name)
    
    //3. Créer le prompt
    const prompt = `TU es un expert culinaire. Analyse cette transcription et vérifie s'il s'agit d'une transcription d'une vidéo recette. Si non, retourne un message error adapté. Si oui, analyse cette transcription de recette et retourne un JSON structuré.

STRUCTURE EXACTE à respecter :
{
  "dish": {
    "name": "nom exact de la recette",
    "prep_time": temps total en minutes (nombre entier),
    "category": "choisis UNE catégorie parmi: ${existing_dish_cats.join(', ')}",
    "instructions": "toutes les étapes de préparation en un seul texte continu"
  },
  "ingredients": [
    {
      "name": "nom de l'ingrédient",
      "quantity": quantité adaptée pour 2 personnes (nombre décimal),
      "unit": "unité (g, ml, unité(s), c. à soupe, c. à café, pincée, etc.)",
      "category": "choisis UNE catégorie parmi: ${existing_ingredient_cats.join(', ')}"
    }
  ]
}

RÈGLES IMPORTANTES :
1. Adapte la recette pour exactement 2 personnes / services
2. Pour prep_time, estime le temps total de préparation en minutes
3. Pour les catégories, choisis celle qui correspond le MIEUX
4. Réponds UNIQUEMENT avec le JSON valide
5. N'ajoute AUCUN texte avant ou après le JSON
6. N'utilise PAS de \`\`\`json ou autre formatage Markdown

Transcription de la recette :
${transcript}`;
    
    console.log('🤖 Envoi à GROQ (modèle: llama-3.3-70b)...');
    
    //4. Appeler GROQ pour générer une réponse en fonction de prompt
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,  // Basse température pour plus de précision
      max_tokens: 2000   // Assez pour une recette complète
    });
    
    const responseText = chatCompletion.choices[0]?.message?.content?.trim();
    
    console.log('✅ Réponse de GROQ:', responseText.substring(0, 200) + '...');
    
    //5. parser le json
    let recipeData;
    
    try {
      // Nettoyer la réponse au cas où il y aurait des backticks
      const cleanedResponse = responseText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      recipeData = JSON.parse(cleanedResponse);
      console.log('✅ JSON parsé avec succès');
      console.log('📊 Recette:', recipeData.dish.name);
      console.log('📊 Nombre d\'ingrédients:', recipeData.ingredients.length);
      
    } catch (parseError) {
      console.error('❌ Erreur lors du parsing du JSON:', parseError);
      console.error('📄 Réponse qui a causé l\'erreur:', responseText);
      
      return NextResponse.json(
        { 
          error: responseText,
          details: parseError.message,
          rawResponse: responseText.substring(0, 500)
        },
        { status: 500 }
      );
    }
    
    // 6. VALIDER LA STRUCTURE
    
    if (!recipeData.dish || !recipeData.ingredients) {
      return NextResponse.json(
        { error: "Le JSON retourné n'a pas la bonne structure" },
        { status: 500 }
      );
    }

    //7. retourner la data
    return NextResponse.json({
      success: true,
      recipe: recipeData
    });
    
  } catch (error) {
    console.error('❌ Erreur complète:', error);
    
    return NextResponse.json(
      { error: "Erreur lors de l'appel à GROQ: " + error.message },
      { status: 500 }
    );
  }
}


