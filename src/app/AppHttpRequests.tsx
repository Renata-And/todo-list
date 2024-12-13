import Checkbox from "@mui/material/Checkbox"
import React, { ChangeEvent, useEffect, useState } from "react"
import type { Todolist } from "../features/todolists/api/todolistsApi.types"
import type { BaseTask, FullTask } from "../features/todolists/api/tasksApi.types"
import { todolistsApi } from "../features/todolists/api/todolistsApi"
import { tasksApi } from "../features/todolists/api/taskApi"
import { TaskStatus } from "common/enums/TaskStatus"
import { AddItemForm, EditableSpan } from "common/components"

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<{ [key: string]: FullTask[] }>({})

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      const todolists = res.data
      setTodolists(todolists)
      todolists.forEach((tl) => {
        tasksApi.getTasks(tl.id).then((res) => {
          setTasks((prevState) => ({
            ...prevState,
            [tl.id]: res.data.items,
          }))
        })
      })
    })
  }, [])

  const createTodolistHandler = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => {
      const newTodo = res.data.data.item
      setTodolists((prevTodolists) => [newTodo, ...prevTodolists])
      setTasks((prevTasks) => ({ ...prevTasks, [newTodo.id]: [] }))
    })
  }

  const removeTodolistHandler = (id: string) => {
    todolistsApi.removeTodolist(id).then(() => {
      setTodolists((prevTodolists) => prevTodolists.filter((tl) => tl.id !== id))
    })
  }

  const updateTodolistHandler = (id: string, title: string) => {
    todolistsApi.updateTodolist({ id, title }).then(() => {
      setTodolists(todolists.map((tl) => (tl.id === id ? { ...tl, title } : tl)))
    })
  }

  const createTaskHandler = (title: string, todolistId: string) => {
    tasksApi.createTask({ title, todolistId }).then((res) => {
      const newTask = res.data.data.item
      setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
    })
  }

  const removeTaskHandler = (taskId: string, todolistId: string) => {
    tasksApi.deleteTask({ taskId, todolistId }).then(() =>
      setTasks({
        ...tasks,
        [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId),
      }),
    )
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: FullTask) => {
    const model: BaseTask = {
      title: task.title,
      description: task.description,
      status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }
    tasksApi.updateTask({ taskId: task.id, todolistId: task.todoListId, model }).then((res) => {
      const newTask = res.data.data.item
      setTasks({
        ...tasks,
        [task.todoListId]: tasks[task.todoListId].map((t) => (t.id === task.id ? newTask : t)),
      })
    })
  }

  const changeTaskTitleHandler = (title: string, task: FullTask) => {
    const model: BaseTask = {
      title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }
    tasksApi.updateTask({ taskId: task.id, todolistId: task.todoListId, model }).then((res) => {
      const newTask = res.data.data.item
      setTasks({
        ...tasks,
        [task.todoListId]: tasks[task.todoListId].map((t) => (t.id === task.id ? newTask : t)),
      })
    })
  }

  return (
    <div style={{ margin: "20px" }}>
      <AddItemForm addItem={createTodolistHandler} />

      {/* Todolists */}
      {todolists.map((tl) => {
        return (
          <div key={tl.id} style={todolist}>
            <div>
              <EditableSpan value={tl.title} onChange={(title: string) => updateTodolistHandler(tl.id, title)} />
              <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
            </div>
            <AddItemForm addItem={(title) => createTaskHandler(title, tl.id)} />

            {/* Tasks */}
            {!!tasks[tl.id] &&
              tasks[tl.id].map((task) => {
                return (
                  <div key={task.id}>
                    <Checkbox
                      checked={task.status === TaskStatus.Completed}
                      onChange={(e) => changeTaskStatusHandler(e, task)}
                    />
                    <EditableSpan value={task.title} onChange={(title) => changeTaskTitleHandler(title, task)} />
                    <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                  </div>
                )
              })}
          </div>
        )
      })}
    </div>
  )
}

// Styles
const todolist: React.CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  gap: "10px",
}
