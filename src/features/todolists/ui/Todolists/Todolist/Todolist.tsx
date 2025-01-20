import { AddItemForm } from "common/components"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "./Tasks/Tasks"
import { addTaskTC } from "../../../model/tasksSlice"
import { useAppDispatch } from "../../../../../app/hooks"
import type { DomainTodolist } from "../../../model/todolistsSlice"

type Props = {
  todolist: DomainTodolist
}

export type TaskType = {
  id: string
  isDone: boolean
  title: string
}

export const Todolist = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const addTask = (taskTitle: string) => {
    dispatch(addTaskTC({ title: taskTitle, todolistId: todolist.id }))
  }

  return (
    <div className="todolist">
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTask} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
}
