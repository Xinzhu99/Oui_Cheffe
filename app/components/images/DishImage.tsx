import { getDishImageUrl } from "@/lib/utils/dish-images";
import { boolean } from "drizzle-orm/gel-core";
import Image from "next/image";

interface DishImageProps {
  dishName: string;
  dbImageUrl?: string | null;
  className?: string;
  priority?: boolean;
}

export function DishImage({
  dishName,
  dbImageUrl,
  className = "",
  priority = false,
}: DishImageProps) {
  const imageUrl = getDishImageUrl(dishName, dbImageUrl);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={imageUrl}
        alt={dishName}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
      />
    </div>
  );
}
