
import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';

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
    
    //3. Créer le prompt
    const prompt = `Tu es un expert culinaire. Analyse cette transcription de vidéo de recette et détermine le TYPE DE PLAT.

Les catégories possibles sont :
- Entrées
- Plats principaux
- Desserts
- Petit-déjeuner
- Apéritifs

Réponds UNIQUEMENT avec le nom de la catégorie, sans explication.

Transcription :
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
      temperature: 0.3,
      max_tokens: 50
    });
    
    const dishType = chatCompletion.choices[0]?.message?.content?.trim();
    
    console.log('✅ Réponse de GROQ:', chatCompletion.choices[0]?.message);
    
    return NextResponse.json({
      success: true,
      dishType: dishType,
      model: "llama-3.3-70b-versatile"
    });
    
  } catch (error) {
    console.error('❌ Erreur complète:', error);
    
    return NextResponse.json(
      { error: "Erreur lors de l'appel à GROQ: " + error.message },
      { status: 500 }
    );
  }
}


