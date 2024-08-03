import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "./ui/form"
import { useForm } from "react-hook-form"
import { useToast } from "./ui/use-toast"
import { ToastAction } from "./ui/toast"
import { api } from "../../convex/_generated/api"
import { useMutation } from "convex/react"
import { AddTaskSchema, type Task } from "./types"

export function TaskForm() {
  const { toast } = useToast()
  const addTask = useMutation(api.tasks.add)

  const addTaskForm = useForm<Task>({
    resolver: zodResolver(AddTaskSchema),
    defaultValues: {
      text: "",
      isCompleted: false
    }
  })

  const onSubmit = async (data: Task) => {
    try {
      await addTask(data)
      toast({
        title: "Tarea agregada correctamente",
        description: data.text,
        action: <ToastAction altText='Goto schedule to undo'>Undo</ToastAction>
      })
      addTaskForm.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo agregar la tarea",
        variant: "destructive"
      })
    }
  }

  return (
    <div className='my-10'>
      <h1 className='text-3xl font-extrabold text-gray-600 mb-3'>
        Agregar Nueva Tarea
      </h1>

      <Form {...addTaskForm}>
        <form
          onSubmit={addTaskForm.handleSubmit(onSubmit)}
          className='w-2/3 space-y-6'
        >
          <FormField
            control={addTaskForm.control}
            name='text'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tarea</FormLabel>
                <FormControl>
                  <Input placeholder='shadcn' {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' disabled={!addTaskForm.formState.isValid}>
            Agregar tarea
          </Button>
        </form>
      </Form>
    </div>
  )
}
