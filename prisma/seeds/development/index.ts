import { PrismaClient } from "@prisma/client";
import { staticUsers, staticCategories, staticCheckpoints } from "./data";

const prisma = new PrismaClient();

async function execute() {
  try {
    await prisma.$connect();

    await prisma.user.createMany({
      data: staticUsers,
    });

    await prisma.category.createMany({
      data: staticCategories,
    });

    await prisma.checkpoint.createMany({
      data: staticCheckpoints,
    });

    console.log("Development seeding completed successfully.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export default execute;
