import { db } from "@/lib/db/drizzle";
import { ingredients, shopping_list, dishes } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

export default async function MyList() {
  const data = await db.select().from(shopping_list)
  console.log("✅",data);

  return (
    <>
      
      <div>Hello
      </div>
    </>
  );
}
