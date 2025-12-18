"use client";

import addToShoppingList from "@/app/actions/shoppingList";
import { useState } from "react";

export default function CreateList() {
const [message, setMessage] = useState("hello")
  
const handleClick = async  () => {
     const result = await addToShoppingList();
     console.log("✨",result)
     setMessage(result.message)

  };
  return (
    <div>
      <button
        onClick={()=>handleClick()}
        className="bg-orange-400 p-2 m-4 text-white font-extrabold rounded-2xl sticky bottom-2 cursor-pointer"
      >
        Créer ma liste
      </button>
      <p>{message}</p>
    </div>
  );
}
