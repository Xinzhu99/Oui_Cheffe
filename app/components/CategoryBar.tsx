"use client"
import { useEffect, useState} from "react"
import getCategories from "../actions/categories"
import { Dish_Category } from "@/lib/types/categories";
import { useRouter } from "next/navigation";

export default function CategoryBar () {

    const [categories, setCategories] = useState<Dish_Category[]>([])
    useEffect(()=> {
        getCategories().then(setCategories)
    }, [])
    //utiliser useROuter pour modifier l'url inside un component client 
    const router = useRouter()

    const handleClick = (e: React.ChangeEvent<HTMLInputElement>) =>{
        router.push(`/?category=${e.target.value}`)
    }
    return (
        <div className="flex flex-wrap gap-4 p-4">
         {categories.map((c)=> (
         <button key={c.id}
         value={c.id}
         className="rounded-full cursor-pointer bg-white border-2 border-orange-400 px-3 py-1 hover:bg-orange-400 hover:text-white"
         onClick={handleClick}
         >{c.name}</button>)
        )}
        </div>

    )
}