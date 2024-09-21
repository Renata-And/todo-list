import React from 'react'
import { Button } from './Button'
import { FilterValuesType } from '../App'

type TodolistPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: number) => void
  changeFilter: (newFilter: FilterValuesType) => void
}

export type TaskType = {
  id: number
  isDone: boolean
  title: string
}

export const Todolist = (props: TodolistPropsType) => {
  const tasksList: JSX.Element = props.tasks.length === 0
    ? <p>Tasks list is empty</p>
    : <ul className='tasks'>
      {props.tasks.map((t: TaskType) => {
        return (
          <li key={t.id}>
            <input type="checkbox" checked={t.isDone} className='checkbox' />
            <span>{t.title}</span>
            <Button
              title='x'
              onClickHandler={() => props.removeTask(t.id)}
            />
          </li>
        )
      })}
    </ul>

  return (
    <div className='todolist'>
      <h3>{props.title}</h3>
      <div>
        <input className='input' />
        <Button
          title='+'
          onClickHandler={() => { }}
        />
      </div>
      {tasksList}
      <div>
        <Button
          title='All'
          onClickHandler={() => props.changeFilter('all')}
        />
        <Button
          title='Active'
          onClickHandler={() => props.changeFilter('active')}
        />
        <Button
          title='Completed'
          onClickHandler={() => props.changeFilter('completed')}
        />
      </div>
    </div>
  )
}
