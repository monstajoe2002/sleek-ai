import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createTask = mutation({
  args: {
    title: v.string(),
    body: v.optional(v.string()),
    date: v.string(),
  },
  handler(ctx, args) {
    return ctx.db.insert("tasks", {
      title: args.title,
      body: args.body,
      completed: false,
      ocurrence: 1,
      date: args.date,
    });
  },
});

export const updateTask = mutation({
  args: {
    id: v.id("tasks"),
    title: v.optional(v.string()),
    body: v.optional(v.string()),
    completed: v.optional(v.boolean()),
    ocurrence: v.optional(v.number()),
    date: v.optional(v.string()),
  },
  async handler(ctx, args) {
    await ctx.db.patch(args.id, args);
  },
});

export const deleteTask = mutation({
  args: {
    id: v.id("tasks"),
  },
  async handler(ctx, { id }) {
    await ctx.db.delete(id);
  },
});

export const getAllTasks = query({
  async handler(ctx) {
    return await ctx.db.query("tasks").collect();
  },
});