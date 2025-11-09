import z from "zod";

export const UserSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  generated: z.boolean(),
  createdAt: z.date().optional(),
});

export const createUserSchema = UserSchema.omit({ id: true, createdAt: true }).extend({
  id: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
