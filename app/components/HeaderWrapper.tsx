export default function HeaderWrapper({
  header,
  text,
}: {
  header: string;
  text: string;
}) {
  return (
    <div className="px-5 py-4">
      {/* Titre principal avec gradient orange inline */}
      <h1
        className="text-2xl font-bold mb-2 leading-tight"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          background: "linear-gradient(90deg, #FF6B35 0%, #FF4500 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {header}
      </h1>

      {/* Sous-titre */}
      <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}
