import { defineConfig } from "prisma/config";
import dotenvx from "@dotenvx/dotenvx";

dotenvx.config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: process.env.DATABASE_URL as string,
  },
});
