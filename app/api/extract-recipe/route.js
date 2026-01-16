//API route pour recevoir un lien Youtube est récupérer le soustitre via la librairie youtube-transcript

import { YoutubeTranscript } from 'youtube-transcript';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // 1. Récupérer l'URL YouTube depuis le body de la requête
    const { youtubeUrl } = await request.json();
    
    // 2. Extraire l'ID de la vidéo
    const videoId = extractVideoId(youtubeUrl);
    
    if (!videoId) {
      return NextResponse.json(
        { error: "URL YouTube invalide" },
        { status: 400 }
      );
    }
    
    // 3. Récupérer les sous-titres
    const transcript = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: 'fr' // Langue française
    });
    
    console.log("transcript", transcript)
    // 4. Transformer les sous-titres en texte continu
    const fullText = transcript.map(item => item.text).join(' ');
    
    // 5. Retourner le texte
    return NextResponse.json({
      success: true,
      transcript: fullText,
      videoId: videoId
    });
    
  } catch (error) {
    console.error('Erreur:', error);
    
    // Gestion des erreurs spécifiques
    if (error.message.includes('Could not find transcript')) {
      return NextResponse.json(
        { error: "Pas de sous-titres disponibles pour cette vidéo. Veuillez utiliser une autre vidéo ou remplir le formulaire manuellement." },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: "Erreur lors de la récupération des sous-titres" },
      { status: 500 }
    );
  }
}

// Fonction helper pour extraire l'ID
function extractVideoId(url) {
  // Regex pour extraire l'ID depuis différents formats d'URL YouTube
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
}