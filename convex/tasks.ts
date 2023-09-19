import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
export const createTask = mutation({
  args: {
    title: v.string(),
    body: v.optional(v.string()),
    date: v.string(),
    userId: v.id("users"),
  },
  handler(ctx, args) {
    return ctx.db.insert("tasks", {
      title: args.title,
      body: args.body,
      completed: false,
      date: args.date,
      userId: args.userId,
    });
  },
});

export const updateTask = mutation({
  args: {
    id: v.id("tasks"),
    title: v.optional(v.string()),
    body: v.optional(v.string()),
  },
  async handler(ctx, args) {
    await ctx.db.patch(args.id, {
      title: args.title,
      body: args.body,
    });
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
export const getTaskById = query({
  args: {
    id: v.id("tasks"),
  },
  async handler(ctx, { id }) {
    return await ctx.db.get(id);
  },
});
export const dragAndDrop = mutation({
  args: {
    id: v.id("tasks"),
    date: v.string(),
  },
  handler(ctx, args) {
    return ctx.db.patch(args.id, {
      date: args.date,
    });
  },
});

export const getTasksByUserId = query({
  args: {
    userId: v.string(),
  },
  async handler(ctx, { userId }) {
    return await ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();
  },
});

export const toggleTask = mutation({
  args: {
    id: v.id("tasks"),
  },
  async handler(ctx, { id }) {
    const task = await ctx.db.get(id);
    await ctx.db.patch(id, {
      completed: !task?.completed,
    });
  },
});
