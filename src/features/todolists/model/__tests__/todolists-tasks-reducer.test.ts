import { addTodolistAC, type DomainTodolist, todolistsReducer } from "../todolists-reducer"
import { tasksReducer, type TasksState } from "../tasks-reducer"
import { v1 } from "uuid"

test("ids should be equals", () => {
  const startTasksState: TasksState = {}
  const startTodolistsState: DomainTodolist[] = []

  const action = addTodolistAC({
    todolist: { title: "new todolist", filter: "all", id: v1(), addedDate: "", order: 0 },
  })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
