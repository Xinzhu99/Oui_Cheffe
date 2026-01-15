"use client";

import addToShoppingList from "@/app/actions/shoppingList";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function CreateList() {
const [message, setMessage] = useState("")
  //fonction pour ajouter des ingrédients dans ma shoopng list
const handleClick = async  () => {
     const result = await addToShoppingList();
     console.log("✨",result)
     setMessage(result.message)
    
     setTimeout(()=> {
       redirect("/my-list")
     }, 1000)
  };
  return (
    <div className="stickyContainer flex flex-col fixed bottom-20 left-0 right-0 bg-white p-4 gap-2">
      {/* partie message */}
      {message && (
        <div
          className={`m-4 p-4 rounded-2xl text-center font-bold ${
            message
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}
      <button
        onClick={()=>handleClick()}
        className="bg-orange-400 p-2 w-full text-white font-extrabold rounded-2xl sticky bottom-2 cursor-pointer"
      >
        Créer ma liste
      </button>
          
    </div>
  );
}
