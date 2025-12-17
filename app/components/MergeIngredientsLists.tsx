"use client"
import { useState } from "react"
export default function MergeIngredientsLists ({listsData}) {
    const [showMergedList, setShowMergedList] = useState(false)

    let listByIngredient = []
    let listByDish = listsData
    for(const dish of listByDish){
        for (const ingredient of dish.ingredients){
            listByIngredient.push(ingredient)
        }
    }
    // console.log("listByIng", listByIngredient)
    let mergedList = []
    listByIngredient.forEach(ing => {
        const obj = mergedList.find(o => o.id === ing.id)
        if (obj) {
            obj.quantity = obj.quantity + ing.quantity
        } else {
            mergedList.push(ing)
        }
    })
    // console.log("merged", mergedList)
    return (
        <>
            <button 
            onClick={()=>setShowMergedList(!showMergedList)}
            className="seeMore bg-blue-300 p-2 m-2 rounded-2xl hover:bg-sky-500"
            >{showMergedList ? "Voir la liste par plat" : "Voir la liste par ingrédient"}</button>

            {showMergedList ? (<ul>
                {mergedList.map((obj)=>
                <li key={obj.id}>{obj.name} : {obj.quantity} {obj.unit}</li>)}
            </ul>) : (
                <div>
        {listsData.map((row, index) => (
          <div key={index}>
            <h1 className="text-3xl text-amber-900">{row.dish}</h1>
            <ul>
              {row.ingredients.map((ingredient) => (
                <li key={ingredient.id}>
                  {ingredient.name} :{" "}
                  {(ingredient.quantity / 2) * row.services}{" "}
                  {ingredient.unit}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
            )}
        </>
    )

}