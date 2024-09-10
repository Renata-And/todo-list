import React from 'react'
import { Button } from './Button'

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
  const tasksList: JSX.Element = props.tasks.length === 0
    ? <p>Tasks list is empty</p>
    : <ul>
      {props.tasks.map((t: TaskType) => {
        return (
          <li key={t.id}>
            <input type="checkbox" checked={t.isDone} />
            <span>{t.title}</span>
          </li>
        )
      })}
    </ul>

  return (
    <div className='todolist'>
      <h3>{props.title}</h3>
      <div>
        <input />
        <Button title='+' />
      </div>
      {tasksList}
      <div>
        <Button title='All' />
        <Button title='Active' />
        <Button title='Completed' />
      </div>
    </div>
  )
}
