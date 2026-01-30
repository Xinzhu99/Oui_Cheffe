"use client";

import { useEffect, useState } from "react";
import getCategories from "../actions/categories";
import { Dish_Category } from "@/lib/types/categories";
import { useRouter, useSearchParams } from "next/navigation";

export default function CategoryBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<Dish_Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  useEffect(() => {
    getCategories().then(setCategories);
    
    // Récupérer la catégorie active depuis l'URL
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setActiveCategory(Number(categoryParam));
    }
  }, [searchParams]);

  const handleClick = (id: number | null) => {
    setActiveCategory(id);
    
    if (id === null) {
      router.push("/");
    } else {
      router.push(`/?category=${id}`);
    }
  };

  return (
    <div className="px-5 py-4">
      {/* Scrollable horizontal */}
      <div 
        className="flex overflow-x-auto gap-2 pb-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
      

        {/* Bouton "Toutes" */}
        <button
          className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
            activeCategory === null
              ? "bg-orange-500 text-white shadow-lg"
              : "bg-white text-gray-800 border-2 border-gray-200 hover:border-orange-500 hover:text-orange-500"
          }`}
          onClick={() => handleClick(null)}
          style={{
            boxShadow: activeCategory === null ? '0 8px 24px rgba(255, 107, 53, 0.15)' : undefined,
          }}
        >
          <span className="flex items-center gap-2">
            <span>Toutes</span>
          </span>
        </button>

        {/* Boutons catégories */}
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
              activeCategory === category.id
                ? "bg-orange-500 text-white shadow-lg"
                : "bg-white text-gray-800 border-2 border-gray-200 hover:border-orange-500 hover:text-orange-500"
            }`}
            onClick={() => handleClick(category.id)}
            style={{
              boxShadow: activeCategory === category.id ? '0 8px 24px rgba(255, 107, 53, 0.15)' : undefined,
            }}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}