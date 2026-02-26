import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  // ⬇️ AJOUTE CES LOGS AVANT TOUT
  console.log("=== DIAGNOSTIC ===");
  console.log("CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
  console.log("API_KEY:", process.env.CLOUDINARY_API_KEY);
  console.log("API_SECRET:", process.env.CLOUDINARY_API_SECRET ? "✅ Présent" : "❌ ABSENT");
  console.log("==================");

  const body = await request.json() as {
    paramsToSign: Record<string, string>;
  };

  const { paramsToSign } = body;

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET as string,
  );

  return Response.json({ signature });
}