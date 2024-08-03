import { TaskForm } from "./TaskForm"
import { TaskTable } from "./TaskTable"

export function TaskComponent() {
  return (
    <div className='container mx-auto'>
      <TaskForm />
      <TaskTable />
    </div>
  )
}
