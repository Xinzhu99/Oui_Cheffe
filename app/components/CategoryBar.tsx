"use client";
import { useEffect, useState } from "react";
import getCategories from "../actions/categories";
import { Dish_Category } from "@/lib/types/categories";
import { useRouter } from "next/navigation";

export default function CategoryBar() {
  //utiliser useRouter pour modifier l'url inside un component client
  const router = useRouter();
  const [categories, setCategories] = useState<Dish_Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleClick = (id: number | null) => {
    if (id === null) {
      router.push("/");
    } else {
      router.push(`/?category=${id}`);
    }

  };
  return (
    <div className="flex flex-wrap gap-4 p-4">
      <button
        className="rounded-full cursor-pointer bg-white border-2 border-orange-400 px-3 py-1 hover:bg-orange-400 hover:text-white"
        value=""
        onClick={() => handleClick(null)}
      >Toutes</button>
      
      {categories.map((c) => (
        <button
          key={c.id}
          value={c.id}
          className="rounded-full cursor-pointer bg-white border-2 border-orange-400 px-3 py-1 hover:bg-orange-400 hover:text-white"
          onClick={() => handleClick(c.id)}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}
