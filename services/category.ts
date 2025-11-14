import { Category } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function getAllCategories(): Promise<Category[]> {
  return prisma.category.findMany({
    orderBy: {
      id: "asc",
    },
  });
}
