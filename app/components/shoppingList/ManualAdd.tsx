"use client"
import { addToShoppingListManually } from "@/app/actions/shoppingList";
import { useState } from "react";

export default function ManualAdd() {
    const [input, setInput] = useState("")
    const [message, setMessage] = useState("")
    
    const handleClick= async()=> {
        const result = await addToShoppingListManually(input)
        setMessage(result.message)
    }
  return (
    <div className="research-bar flex gap-4 p-3">
      <input
        type="text"
        placeholder="ex : banane"
        onChange={(e)=> setInput(e.target.value)}
        required
        className="bg-gray-200 p-2 rounded-2xl"
      />
      <button className="text-white bg-orange-400 p-2 rounded-full cursor-pointer"
      type="submit"
      onClick={()=>handleClick()}>
        ➕
      </button>
      <p>{message}</p>
    </div>
  );
}
