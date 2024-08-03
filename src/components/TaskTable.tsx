import { useMutation, useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "./ui/table"
import { Button } from "./ui/button"
import type { EditTask } from "./types"
import { EditTaskComponent } from "./EditTaskComponent"
import { useState } from "react"
import clsx from "clsx"
import { toast } from "./ui/use-toast"
import { ToastAction } from "./ui/toast"
import { DialogComponent } from "./DialogComponent"

export function TaskTable() {
  const tasks = useQuery(api.tasks.get)
  const [selectedTask, setSelectedTask] = useState<EditTask | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const handleEditTask = (task: EditTask) => {
    setSelectedTask(task)
    setIsSheetOpen(true)
  }
  const deleteTask = useMutation(api.tasks.deleteTask)

  const handleConfirm = (confirmed: boolean) => {
    console.log(confirmed)
    if (confirmed && selectedTask) {
      handleDeleteTask(selectedTask)
    }
  }

  const handleDeleteTask = async (task: EditTask) => {
    try {
      await deleteTask({ id: task._id })
      toast({
        title: "Tarea eliminada correctamente",
        action: <ToastAction altText='Goto schedule to undo'>Undo</ToastAction>
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar la tarea"
      })
    } finally {
      handleCloseDialog()
    }
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedTask(null)
  }

  const handleCloseSheet = () => {
    setIsSheetOpen(false)
    setSelectedTask(null)
  }
  if (!tasks) {
    return null
  }

  return (
    <div>
      <Table>
        <TableCaption>Lista de tus tareas.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Tarea</TableHead>
            <TableHead className='w-[100px]'>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task._id}>
              <TableCell className={clsx({ "line-through": task.isCompleted })}>
                {task.text}
              </TableCell>
              <TableCell>
                <div className='flex justify-between'>
                  <div>
                    {task.isCompleted ? (
                      <p className='text-green-500'>Completada</p>
                    ) : (
                      <p className='text-red-500'>Pendiente</p>
                    )}
                  </div>
                  <div>
                    <Button
                      variant='ghost'
                      onClick={() => handleEditTask(task)}
                      className='me-2'
                    >
                      Editar
                    </Button>
                    <Button
                      variant='destructive'
                      onClick={() => {
                        setIsDialogOpen(true)
                        setSelectedTask(task)
                      }}
                    >
                      Borrar
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {selectedTask && (
          <EditTaskComponent
            task={selectedTask}
            isOpen={isSheetOpen}
            onClose={handleCloseSheet}
          />
        )}
      </Table>
      <DialogComponent
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        title='¿Estás seguro?'
        description='Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta y eliminará tus datos de nuestros servidores.'
        onConfirm={(confirmed: boolean) => handleConfirm(confirmed)}
      />
    </div>
  )
}
