import { v } from "convex/values"
import { query, mutation } from "./_generated/server"

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect()
  }
})

export const add = mutation({
  args: { text: v.string(), isCompleted: v.boolean() },
  handler: ({ db }, { text, isCompleted }) => {
    db.insert("tasks", { text, isCompleted })
  }
})

export const updateTask = mutation({
  args: {
    id: v.id("tasks"),
    task: v.object({
      text: v.optional(v.string()),
      isCompleted: v.optional(v.boolean())
    })
  },
  handler: async (ctx, args) => {
    const { id, task } = args
    const foundTask = await ctx.db.get(id)
    if (!foundTask) throw new Error("Task not found")
    await ctx.db.patch(id, task)
  }
})

export const deleteTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  }
})
