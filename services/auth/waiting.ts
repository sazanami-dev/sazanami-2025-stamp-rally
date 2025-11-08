import { prisma } from "@/lib/prisma";
import { SetTokenWaiting } from "@prisma/client";

const EXPIRATION_MINUTES = 15; // TODO: Move to env variable

// 呼び出し元でハンドリングしたいので
export class WaitingEntryNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WaitingEntryNotFoundError";
  }
}

export class WaitingEntryExpiredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WaitingEntryExpiredError";
  }
}

async function createWaiting(redirectTo?: string) {
  const now = new Date();
  const waiting = await prisma.setTokenWaiting.create({
    data: {
      redirectTo: redirectTo || null,
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
    throw new WaitingEntryNotFoundError("Waiting entry not found");
  }
  if (waiting.expiresAt < new Date()) {
    throw new WaitingEntryExpiredError("Waiting entry has expired");
  }

  // Delete the waiting entry after resolving
  await prisma.setTokenWaiting.delete({
    where: { id: waitingId },
  });

  return waiting;
}

export { createWaiting, setToken, resolveWaiting };
