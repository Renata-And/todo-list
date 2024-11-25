import React, { useRef, useState } from 'react'
import { Button } from './Button'
import { FilterValuesType } from '../app/App'

type TodolistPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  deleteAllTasks: () => void
  addTask: (taskTitle: string) => void
}

export type TaskType = {
  id: string
  isDone: boolean
  title: string
}

export const Todolist = (props: TodolistPropsType) => {
  const [filter, setFilter] = useState<FilterValuesType>('all');
  const inputRef = useRef<HTMLInputElement>(null)

  let filteredTasks: Array<TaskType> = props.tasks;
  if (filter === 'active') {
    filteredTasks = props.tasks.filter(t => !t.isDone)
  }
  if (filter === 'completed') {
    filteredTasks = props.tasks.filter(t => t.isDone)
  }
  if (filter === 'firstThree') {
    filteredTasks = props.tasks.filter((t) => t === props.tasks[0] || t === props.tasks[1] || t === props.tasks[2])
  }

  const changeFilter = (newFilter: FilterValuesType) => setFilter(newFilter);

  const tasksList: JSX.Element = props.tasks.length === 0
    ? <p>Tasks list is empty</p>
    : <ul className='tasks'>
      {filteredTasks.map((t: TaskType) => {
        return (
          <li key={t.id}>
            <input type="checkbox" checked={t.isDone} className='checkbox' />
            <span>{t.title}</span>
            <Button
              title='x'
              onClick={() => props.removeTask(t.id)}
            />
          </li>
        )
      })}
    </ul>

  return (
    <div className='todolist'>
      <h3>{props.title}</h3>
      <div>
        <input className='input' ref={inputRef} />
        <Button
          title='+'
          onClick={() => {
            if (inputRef.current) {
              props.addTask(inputRef.current.value);
              inputRef.current.value = '';
            }
          }
          }
        />
      </div>
      {tasksList}
      <div>
        <Button
          title='Delete all tasks'
          onClick={() => { props.deleteAllTasks() }}
        />
      </div>
      <div>
        <Button
          title='All'
          onClick={() => changeFilter('all')}
        />
        <Button
          title='Active'
          onClick={() => changeFilter('active')}
        />
        <Button
          title='Completed'
          onClick={() => changeFilter('completed')}
        />
        <Button
          title='First three tasks'
          onClick={() => changeFilter('firstThree')}
        />
      </div>
    </div>
  )
}
