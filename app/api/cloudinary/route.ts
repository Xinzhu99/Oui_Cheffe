import { v2 as cloudinary } from "cloudinary";

export async function POST(request: Request) {
  //lit le corps de ma requestion qui contient un objet paramsToSign envoyée par le widget
  const body = (await request.json()) as {
    paramsToSign: Record<string, string>;
  };
  //extraire le paramsToSign
  const { paramsToSign } = body;
  //vérification signature, un acte de sécurité pour éviter n'importe qui pourrait uploader sur mon cloudinary
  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET as string,
  );

  console.log(Response.json({ signature }));
}
