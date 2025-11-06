import { User, Category, Checkpoint } from "@prisma/client";

// 固定ユーザー
const staticUsers: Omit<User, "createdAt">[] = [
  { id: "alice", displayName: "Alice" },
  { id: "bob", displayName: "Bob" },
  { id: "charlie", displayName: "Charlie" },
];

const staticCategories: Omit<Category, "createdAt">[] = [
  { id: "category1", name: "Category 1", cooldownDuration: 10 },
  { id: "category2", name: "Category 2", cooldownDuration: 20 },
  { id: "category3", name: "Category 3", cooldownDuration: 30 },
];

// createdAtとcooldownDurationOverrideをOmit
const staticCheckpoints: Omit<Checkpoint, "createdAt" | "cooldownDurationOverride">[] = [
  { id: "checkpoint1", displayName: "Checkpoint 1", categoryId: "category1", floor: 1 },
  { id: "checkpoint2", displayName: "Checkpoint 2", categoryId: "category1", floor: 2 },
  { id: "checkpoint3", displayName: "Checkpoint 3", categoryId: "category2", floor: 3 },
  { id: "checkpoint4", displayName: "Checkpoint 4", categoryId: "category2", floor: 4 },
  { id: "checkpoint5", displayName: "Checkpoint 5", categoryId: "category3", floor: 5 },
];

export { staticUsers, staticCategories, staticCheckpoints };
