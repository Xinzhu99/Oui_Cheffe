
"use client"

import { useState } from "react";


export default function TestYoutbe() {

    const [url, setUrl] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch("http://localhost:3000/api/extract-recipe", {
                method: "POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify({
                    youtubeUrl: url
                })

            })
            const result = await res.json()
            console.log("result", result)
            setUrl("")
        } catch (error) {
            console.error(error, "problem with server")
        }

    }
    return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Test YouTube Transcript</h1>
      
      <form onSubmit={handleSubmit}>
        <input
        className="w-100 p-10 mb-2 border-amber-500 border-2 bg-amber-100"
          type="text"
          required
          placeholder="Colle l'URL YouTube ici"
          onChange={(e)=>setUrl(e.target.value)}
        />
        <button type="submit">
          Soumettre
        </button>
        <p>{url}</p>
      </form>

      {/* {error && (
        <div style={{ color: 'red', marginTop: '20px' }}>
          ❌ {error}
        </div>
      )} */}

      {/* {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>✅ Sous-titres récupérés !</h2>
          <p><strong>Video ID:</strong> {result.videoId}</p>
          <div style={{ 
            background: '#f5f5f5', 
            padding: '20px', 
            borderRadius: '8px',
            maxHeight: '400px',
            overflow: 'auto'
          }}>
            {result.transcript}
          </div>
        </div>
      )} */}
    </div>
  );
}