import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Button } from './Button'
import { FilterValuesType } from '../App'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'

type TodolistPropsType = {
  listId: string
  title: string
  listFilter: string
  tasks: TaskType[]
  removeTask: (taskId: string, todolistId: string) => void
  deleteAllTasks: (todolistId: string) => void
  addTask: (taskTitle: string, todolistId: string) => void
  setTaskNewStatus: (taskId: string, newStatus: boolean, todolistId: string) => void
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
  changeTodolistFilter: (newFilter: FilterValuesType, todolistId: string) => void
  changeTodolistTitle: (title: string, todolistId: string) => void
  deleteTodolist: (todolistId: string) => void
}

export type TaskType = {
  id: string
  isDone: boolean
  title: string
}

export const Todolist = ({ listId, title, listFilter, addTask, deleteAllTasks, removeTask, setTaskNewStatus, changeTaskTitle, tasks, changeTodolistFilter, changeTodolistTitle, deleteTodolist }: TodolistPropsType) => {

  const tasksList: JSX.Element = tasks.length === 0
    ? <p>Tasks list is empty</p>
    : (
      <ul className='tasks'>
        {tasks.map((t: TaskType) => {
          const removeTaskHandler = () => removeTask(t.id, listId);
          const setTaskNewStatusHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskNewStatus(t.id, e.currentTarget.checked, listId);
          const changeTaskTitleHandler = (title: string) => {
            changeTaskTitle(t.id, title, listId)
          }
          return (
            <li key={t.id}>
              <input
                className='checkbox'
                type="checkbox"
                checked={t.isDone}
                onChange={setTaskNewStatusHandler}
              />
              <EditableSpan title={t.title} changeTitle={changeTaskTitleHandler} className={t.isDone ? 'titleDone' : ''} />
              <Button
                className={'remove-button'}
                title={'x'}
                onClick={removeTaskHandler}
              />
            </li>
          )
        })}
      </ul>
    )

  const addTaskHandler = (taskTitle: string) => addTask(taskTitle, listId);
  const deleteAllTasksHandler = () => deleteAllTasks(listId);

  const changeTodolistFilterTaskHandler = (filter: FilterValuesType) => {
    changeTodolistFilter(filter, listId)
  }
  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle(title, listId)
  }

  return (
    <div className='todolist'>
      <h3>
        <EditableSpan title={title} changeTitle={changeTodolistTitleHandler} />
        <Button title={'x'} onClick={() => deleteTodolist(listId)} />
      </h3>
      <AddItemForm addItem={addTaskHandler} />
      {tasksList}
      <div>
        <Button
          title={'Delete all tasks'}
          onClick={deleteAllTasksHandler}
        />
      </div>
      <div>
        <Button
          className={listFilter === 'all' ? 'button-active' : ''}
          title={'All'}
          onClick={() => changeTodolistFilterTaskHandler('all')}
        />
        <Button
          className={listFilter === 'active' ? 'button-active' : ''}
          title={'Active'}
          onClick={() => changeTodolistFilterTaskHandler('active')}
        />
        <Button
          className={listFilter === 'completed' ? 'button-active' : ''}
          title={'Completed'}
          onClick={() => changeTodolistFilterTaskHandler('completed')}
        />
        <Button
          className={listFilter === 'firstThree' ? 'button-active' : ''}
          title={'First three tasks'}
          onClick={() => changeTodolistFilterTaskHandler('firstThree')}
        />
      </div>
    </div>
  )
}
