import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
  tasks: defineTable({
    title: v.string(),
    body: v.optional(v.string()),
    completed: v.boolean(),
    // embedding: v.array(v.float64()),
    date: v.string(),
    userId: v.string(),
  }),
});
