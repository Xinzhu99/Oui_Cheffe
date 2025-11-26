import Link from "next/link";
export default function ShowDishDetails({ id }) {
  return (
    <Link
      href={`/dish/${id}`}
      className="seeMore bg-blue-300 p-2 m-2 rounded-2xl hover:bg-sky-500"
    >
      Voir la recette
    </Link>
  );
}
