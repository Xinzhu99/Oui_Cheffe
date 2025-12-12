import Link from "next/link";
export default function ShowDishDetails({ id }) {
  return (
    <Link
      href={`/dish/${id}`}
      className=" flex items-center justify-end  mh-3 text-2xl text-orange-400  transition-all duration-300  hover:scale-100 active:scale-95"
    >
      <span className="transition-transform duration-300 hover:text-gray-400">
        →
      </span>
    </Link>
  );
}
