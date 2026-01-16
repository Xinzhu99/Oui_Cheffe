// app/api/extract-recipe/route.js

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
    
    console.log('🎬 Video ID extrait:', videoId);
    
    // 3. Essayer de récupérer les sous-titres en français
    let transcript;
    let language = 'fr';
    
    try {
      transcript = await YoutubeTranscript.fetchTranscript(videoId, {
        lang: 'fr'
      });
      console.log('✅ Sous-titres FR trouvés:', transcript.length, 'segments');
    } catch (frError) {
      console.log('⚠️ Pas de sous-titres FR, essai en anglais...');
      
      // Si pas de FR, essayer en anglais
      try {
        transcript = await YoutubeTranscript.fetchTranscript(videoId, {
          lang: 'en'
        });
        language = 'en';
        console.log('✅ Sous-titres EN trouvés:', transcript.length, 'segments');
      } catch (enError) {
        console.log('❌ Pas de sous-titres EN non plus');
        
        // Dernière tentative : sans spécifier de langue
        try {
          transcript = await YoutubeTranscript.fetchTranscript(videoId);
          language = 'auto';
          console.log('✅ Sous-titres AUTO trouvés:', transcript.length, 'segments');
        } catch (autoError) {
          throw new Error('Aucun sous-titre disponible');
        }
      }
    }
    
    // 4. Vérifier que le transcript n'est pas vide
    if (!transcript || transcript.length === 0) {
      return NextResponse.json(
        { error: "Les sous-titres sont vides pour cette vidéo" },
        { status: 404 }
      );
    }
    
    // 5. Transformer les sous-titres en texte continu
    const fullText = transcript.map(item => item.text).join(' ');
    
    console.log('📝 Texte extrait:', fullText.substring(0, 200) + '...');
    
    // 6. Retourner le texte
    return NextResponse.json({
      success: true,
      transcript: fullText,
      videoId: videoId,
      language: language,
      segmentCount: transcript.length
    });
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    
    // Gestion des erreurs spécifiques
    if (error.message.includes('Could not find transcript') || 
        error.message.includes('Aucun sous-titre disponible')) {
      return NextResponse.json(
        { 
          error: "Pas de sous-titres disponibles pour cette vidéo. Veuillez utiliser une autre vidéo ou remplir le formulaire manuellement.",
          videoId: extractVideoId(await request.json().then(data => data.youtubeUrl))
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: "Erreur lors de la récupération des sous-titres: " + error.message },
      { status: 500 }
    );
  }
}

// Fonction helper pour extraire l'ID
function extractVideoId(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
}
