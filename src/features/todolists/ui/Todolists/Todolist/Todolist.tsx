import { AddItemForm } from "common/components"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "./Tasks/Tasks"
import type { DomainTodolist } from "../../../model/todolistsSlice"
import { useCreateTaskMutation } from "../../../api/tasksApi"

type Props = {
  todolist: DomainTodolist
}

export type TaskType = {
  id: string
  isDone: boolean
  title: string
}

export const Todolist = ({ todolist }: Props) => {
  const [createTask] = useCreateTaskMutation()

  const addTaskHandler = (taskTitle: string) => {
    createTask({ title: taskTitle, todolistId: todolist.id })
  }

  return (
    <div className="todolist">
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
}
