import { useMutation } from "convex/react"
import { AddTaskSchema, type EditTask, type Task } from "./types"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  SheetClose
} from "./ui/sheet"
import { api } from "../../convex/_generated/api"
import { toast } from "./ui/use-toast"
import { ToastAction } from "./ui/toast"
import { Form, FormField } from "./ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "./ui/checkbox"
import { useState } from "react"

interface EditTaskProps {
  task: EditTask
  isOpen: boolean
  onClose: () => void
}

export function EditTaskComponent({ task, isOpen, onClose }: EditTaskProps) {
  const updateTask = useMutation(api.tasks.updateTask)
  const [isChecked, setIsChecked] = useState<boolean>(task.isCompleted)

  const form = useForm<Task>({
    resolver: zodResolver(AddTaskSchema),
    defaultValues: {
      text: task.text,
      isCompleted: isChecked
    }
  })

  const onSubmit = async (data: Task) => {
    console.log("data")
    try {
      await updateTask({
        id: task._id,
        task: data
      })
      toast({
        title: "Tarea editada correctamente",
        action: <ToastAction altText='Goto schedule to undo'>Undo</ToastAction>
      })
    } catch (error) {
      toast({
        title: "Error al actualizar la tarea",
        action: <ToastAction altText='Goto schedule to undo'>Undo</ToastAction>
      })
      console.error("Error al actualizar la tarea:", error)
    }
  }

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-2/3 space-y-6'
          >
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Editar tarea</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </SheetDescription>
              </SheetHeader>
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <FormField
                    control={form.control}
                    name='text'
                    render={({ field }) => (
                      <>
                        <Label htmlFor='name' className='text-right'>
                          Tarea
                        </Label>

                        <Input id='text' className='col-span-3' {...field} />
                      </>
                    )}
                  />
                </div>
                <div className='items-top flex space-x-2'>
                  <Checkbox
                    id='terms1'
                    checked={isChecked}
                    onCheckedChange={(newValue: boolean): void => {
                      setIsChecked(newValue)
                      form.setValue("isCompleted", newValue)
                    }}
                  />
                  <div className='grid gap-1.5 leading-none'>
                    <label
                      htmlFor='terms1'
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                      Marcar como completada
                    </label>
                  </div>
                </div>
              </div>

              <SheetFooter>
                <SheetClose>
                  <Button
                    type='submit'
                    onClick={() => onSubmit(form.getValues())}
                    className='me-4'
                  >
                    Guardar
                  </Button>
                  <Button variant='secondary'>Cancelar</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </form>
        </Form>
      </Sheet>
    </div>
  )
}
