"use client"
import { CldUploadWidget } from "next-cloudinary";

export function TestImage() {
  return (
    <div>
      <h3
        className="text-lg font-bold mb-4 text-orange-500"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        🖼️ Image
      </h3>
      
      <CldUploadWidget 
        signatureEndpoint="/api/cloudinary"
        uploadPreset="oui_cheffe"  
        onSuccess={(result: any) => {
          console.log("URL :", result.info.secure_url);
        }}
      >
        {({ open }) => (
          <button
            onClick={() => open()}
            className="flex-1 text-white p-3 font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-50"
            style={{
              background: "#D1D5DB linear-gradient(135deg, #FF8C61, #FF6B35)",
              fontFamily: "'Montserrat', sans-serif",
            }}
            type="button"
          >
            Ajouter une photo
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}