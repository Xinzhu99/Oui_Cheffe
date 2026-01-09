"use client"
import { addToCustomized } from "@/app/actions/customized";
import { useState } from "react";

export default function ManualAdd() {
    const [input, setInput] = useState("")
    const [message, setMessage] = useState("")
    
    const handleClick= async()=> {
        const result = await addToCustomized(input)
        setMessage(result.message)
        setInput("")
    }
  return (
    <div className="research-bar flex gap-4 p-3">
      <input
        type="text"
        placeholder="ex: banane"
        onChange={(e)=> setInput(e.target.value)}
        value={input}
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
