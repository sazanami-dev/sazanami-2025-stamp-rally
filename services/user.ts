import { prisma } from "@/lib/prisma";
import { CreateUser } from "@/types/schema/user";
import { User } from "@prisma/client";

async function getUserById(userId: string) {
}

async function createUser(userData: CreateUser): Promise<User> {
  if (!userData.id) {
    userData.id = crypto.getRandomValues(new Uint8Array(16)).join("");
  }
  const newUser = await prisma.user.create({
    data: userData,
  });
  return newUser;
}

export { getUserById, createUser };
