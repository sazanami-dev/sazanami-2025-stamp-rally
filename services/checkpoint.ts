import { prisma } from "@/lib/prisma";

async function getAllCheckpoints() {
  const checkpoints = await prisma.checkpoint.findMany({
    orderBy: { createdAt: 'asc' },
  });
  return checkpoints;
}

export { getAllCheckpoints };
