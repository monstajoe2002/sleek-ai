import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
  tasks: defineTable({
    title: v.string(),
    body: v.optional(v.string()),
    completed: v.boolean(),
    ocurrence: v.number(),
    date: v.string(),
  }).vectorIndex("by_title", {
    vectorField: "title",
    dimensions: 1536,
    filterFields: ["title"],
  }),
});
