import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  deleteTodolistAC,
  type DomainTodolist,
  type FilterValuesType,
  todolistsReducer,
} from "../todolists-reducer"
import { v1 } from "uuid"

let todolistId1: string
let todolistId2: string

let startState: DomainTodolist[]

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = [
    { id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0 },
    { id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0 },
  ]
})

test("correct todolist should be deleted", () => {
  const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
  const newTodolistTitle = "Menu for New Year 2025"
  const endState = todolistsReducer(
    startState,
    addTodolistAC({
      todolist: {
        id: v1(),
        filter: "all",
        order: 0,
        addedDate: "",
        title: newTodolistTitle,
      },
    }),
  )

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTodolistTitle)
})

test("todolist filter type should be changed correct", () => {
  const newFilter: FilterValuesType = "completed"
  const newState = todolistsReducer(startState, changeTodolistFilterAC({ filter: newFilter, todolistId: todolistId1 }))

  expect(newState[0].filter).toBe(newFilter)
  expect(newState[1].filter).toBe("all")
})

test("todolist title should be changed correct", () => {
  const newTitle = "New title"
  const endState = todolistsReducer(startState, changeTodolistTitleAC({ title: newTitle, todolistId: todolistId2 }))

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(newTitle)
})
