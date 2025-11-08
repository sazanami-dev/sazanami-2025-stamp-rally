import { prisma } from "@/lib/prisma";

const EXPIRATION_MINUTES = 15; // TODO: Move to env variable

async function createWaiting() {
  const now = new Date();
  const waiting = await prisma.setTokenWaiting.create({
    data: {
      expiresAt: new Date(now.getTime() + EXPIRATION_MINUTES * 60000),
    },
  });
  return waiting;
}

async function setToken(waitingId: string, token: string) {
  const waiting = await prisma.setTokenWaiting.update({
    where: { id: waitingId },
    data: { token },
  });
  return waiting;
}

async function resolveWaiting(waitingId: string) {
  const waiting = await prisma.setTokenWaiting.findUnique({
    where: { id: waitingId },
  });
  if (!waiting) {
    throw new Error("Waiting entry not found");
  }
  if (waiting.expiresAt < new Date()) {
    throw new Error("Waiting entry has expired");
  }

  // Delete the waiting entry after resolving
  await prisma.setTokenWaiting.delete({
    where: { id: waitingId },
  });

  return waiting;
}

export { createWaiting, setToken, resolveWaiting };
