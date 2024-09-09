import React from 'react'

type TodolistPropsType = {
  title: string
  tasks: Array<TaskType>
}

export type TaskType = {
  id: number
  isDone: boolean
  title: string
}

export const Todolist = (props: TodolistPropsType) => {

  const tasksList: Array<JSX.Element> = props.tasks.map((task: TaskType) => {
    return (
      <li key={task.id}>
        <input type="checkbox" checked={task.isDone} />
        <span>{task.title}</span>
      </li>
    )
  })
  return (
    <div className='todolist'>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {tasksList}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  )
}
