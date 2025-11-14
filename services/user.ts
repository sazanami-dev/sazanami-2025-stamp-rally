import { prisma } from "@/lib/prisma";
import { CreateUser } from "@/types/schema/user";
import { User } from "@prisma/client";

async function getUserById(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
  });
}

async function isUserExists(userId: string): Promise<boolean> {
  const count = await prisma.user.count({
    where: { id: userId },
  });
  return count > 0;
}

async function createUser(userData: CreateUser): Promise<User> {
  if (!userData.id) {
    userData.id = crypto.getRandomValues(new Uint8Array(16)).join("");
  }
  return prisma.user.create({
    data: userData,
  });
}

async function updateUser(userId: string, updateData: Partial<CreateUser>): Promise<User> {
  return prisma.user.update({
    where: { id: userId },
    data: updateData,
  });
}

export { getUserById, createUser, isUserExists, updateUser };
