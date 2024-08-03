import { z } from "zod"
import type { Id } from "../../convex/_generated/dataModel"

export const AddTaskSchema = z.object({
  text: z.string().min(2, {
    message: "text must be at least 2 characters."
  }),
  isCompleted: z.boolean()
})

export type Task = z.infer<typeof AddTaskSchema>

export interface EditTask {
  _id: Id<"tasks">
  _creationTime: number
  text: string
  isCompleted: boolean
}
