// components/shoppingList/SectionCard.tsx
export default function SectionCard({
  title,
  isEmpty,
  emptyMessage,
  children,
}: {
  title: string;
  isEmpty?: boolean;
  emptyMessage?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="bg-white rounded-2xl p-5 border border-gray-200"
      style={{
        boxShadow: '0 4px 16px rgba(255, 107, 53, 0.08)',
      }}
    >
     

      {/* Titre de section */}
      <h2
        className="text-xl font-bold mb-4 pb-3 border-b border-gray-200"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          color: '#FF6B35',
        }}
      >
        {title}
      </h2>

      {/* Contenu ou état vide */}
      {isEmpty ? (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">{emptyMessage}</p>
        </div>
      ) : (
        <div className="space-y-3">{children}</div>
      )}
    </div>
  );
}