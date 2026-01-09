"use client"


export default function CustomizedList({ 
  items 
}: { 
  items: Array<{
     id: number;
    name: string;
    is_checked: boolean;
  }>
}) {
  if (items.length === 0) {
    return (
      <div className="m-4 p-4 text-gray-500 text-center">
        Aucun article
      </div>
    )
  }

  return (
    <div className="m-4 space-y-2">
      {items.map((item) => (
        <div 
          key={item.id} 
          className={`
            bg-white p-4 rounded-2xl shadow
            ${item.is_checked ? 'opacity-50' : ''}
          `}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-[15px] font-bold ${item.is_checked ? 'line-through' : ''}`}>
                {item.name}
              </h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}