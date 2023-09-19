import { v } from "convex/values";
import {
  action,
  internalAction,
  internalMutation,
  mutation,
  query,
} from "./_generated/server";
import { api, internal } from "./_generated/api";
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

export const getAllTasks = query({
  async handler(ctx) {
    return await ctx.db.query("tasks").collect();
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

export const generateTasks = action({
  args: {
    userPrompt: v.string(),
    date: v.string(),
    userId: v.id("users"),
  },
  async handler(ctx, { date, userPrompt, userId }) {
    const res = (await ctx.runAction(internal.generate.generate, {
      userPrompt,
      date,
    })) as string;
    const cleanedString = res.replace(/^```json\s+/, "").replace(/\s+```$/, "");
    const tasks: Array<{
      body?: string;
      title: string;
      date: string;
      userId: string;
    }> = JSON.parse(cleanedString);
    tasks.forEach(async (task) => {
      await ctx.runMutation(api.tasks.createTask, {
        title: task.title,
        date: task.date,
        userId,
      });
    });
  },
});
