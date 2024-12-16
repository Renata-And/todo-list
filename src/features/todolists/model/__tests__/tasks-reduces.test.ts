import { addTaskAC, removeTaskAC, tasksReducer, type TasksState, updateTaskAC } from "../tasks-reducer"
import { addTodolistAC, deleteTodolistAC } from "../todolists-reducer"
import { TaskPriority, TaskStatus } from "common/enums/TaskStatus"
import { v1 } from "uuid"

let startState: TasksState

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        startDate: "",
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        status: TaskStatus.New,
        order: 0,
        addedDate: "",
        todoListId: "todolistId1",
      },
      {
        id: "2",
        title: "JS",
        startDate: "",
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        status: TaskStatus.Completed,
        order: 0,
        addedDate: "",
        todoListId: "todolistId1",
      },
      {
        id: "3",
        title: "React",
        startDate: "",
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        status: TaskStatus.New,
        order: 0,
        addedDate: "",
        todoListId: "todolistId1",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        startDate: "",
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        status: TaskStatus.New,
        order: 0,
        addedDate: "",
        todoListId: "todolistId2",
      },
      {
        id: "2",
        title: "milk",
        startDate: "",
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        status: TaskStatus.New,
        order: 0,
        addedDate: "",
        todoListId: "todolistId2",
      },
      {
        id: "3",
        title: "tea",
        startDate: "",
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        status: TaskStatus.Completed,
        order: 0,
        addedDate: "",
        todoListId: "todolistId2",
      },
    ],
  }
})

test("correct task should be deleted from correct array", () => {
  const endState = tasksReducer(startState, removeTaskAC({ todolistId: "todolistId2", taskId: "2" }))

  expect(endState).toEqual({
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        startDate: "",
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        status: TaskStatus.New,
        order: 0,
        addedDate: "",
        todoListId: "todolistId1",
      },
      {
        id: "2",
        title: "JS",
        startDate: "",
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        status: TaskStatus.Completed,
        order: 0,
        addedDate: "",
        todoListId: "todolistId1",
      },
      {
        id: "3",
        title: "React",
        startDate: "",
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        status: TaskStatus.New,
        order: 0,
        addedDate: "",
        todoListId: "todolistId1",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        startDate: "",
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        status: TaskStatus.New,
        order: 0,
        addedDate: "",
        todoListId: "todolistId2",
      },
      {
        id: "3",
        title: "tea",
        startDate: "",
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        status: TaskStatus.Completed,
        order: 0,
        addedDate: "",
        todoListId: "todolistId2",
      },
    ],
  })
})

test("correct task should be added to correct array", () => {
  const endState = tasksReducer(
    startState,
    addTaskAC({
      task: {
        title: "juice",
        todoListId: "todolistId2",
        id: "3",
        status: TaskStatus.New,
        order: 0,
        addedDate: "",
        deadline: "",
        description: "",
        priority: TaskPriority.Low,
        startDate: "",
      },
    }),
  )

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(4)
  expect(endState["todolistId2"][0].id).toBeDefined()
  expect(endState["todolistId2"][0].title).toBe("juice")
  expect(endState["todolistId2"][0].status).toBe(TaskStatus.New)
})

test("status of specified task should be changed", () => {
  const endState = tasksReducer(
    startState,
    updateTaskAC({
      task: {
        id: "2",
        title: "tea",
        startDate: "",
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        status: TaskStatus.New,
        order: 0,
        addedDate: "",
        todoListId: "todolistId2",
      },
    }),
  )

  expect(endState["todolistId1"][1].status).toBe(TaskStatus.Completed)
  expect(endState["todolistId2"][1].status).toBe(TaskStatus.New)
})

test("title of specified task should be changed", () => {
  const endState = tasksReducer(
    startState,
    updateTaskAC({
      task: {
        id: "3",
        title: "juice",
        startDate: "",
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        status: TaskStatus.New,
        order: 0,
        addedDate: "",
        todoListId: "todolistId2",
      },
    }),
  )

  expect(endState["todolistId2"][2].title).toBe("juice")
  expect(endState["todolistId1"][2].title).not.toBe("juice")
})

test("property with todolistId should be deleted", () => {
  const action = deleteTodolistAC("todolistId2")
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys).toHaveLength(1)
  expect(endState["todolistId2"]).toBeUndefined()
})

test("new array should be added when new todolist is added", () => {
  const endState = tasksReducer(
    startState,
    addTodolistAC({
      todolist: {
        id: v1(),
        title: "new todolist",
        order: 0,
        addedDate: "",
        filter: "all",
      },
    }),
  )

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

// test("all tasks of specified todolist should be deleted", () => {
//   const endState = tasksReducer(startState, deleteAllTasksAC("todolistId2"))
//
//   expect(endState["todolistId2"].length).toBe(0)
//   expect(endState["todolistId1"].length).toBe(3)
// })
