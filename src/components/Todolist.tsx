import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Button } from './Button'
import { FilterValuesType } from '../App'

type TodolistPropsType = {
  listId: string
  title: string
  listFilter: string
  tasks: TaskType[]
  removeTask: (taskId: string, todolistId: string) => void
  deleteAllTasks: (todolistId: string) => void
  addTask: (taskTitle: string, todolistId: string) => void
  setTaskNewStatus: (taskId: string, newStatus: boolean, todolistId: string) => void
  changeTodolistFilter: (newFilter: FilterValuesType, todolistId: string) => void
  deleteTodolist: (todolistId: string) => void
}

export type TaskType = {
  id: string
  isDone: boolean
  title: string
}

export const Todolist = ({ listId, title, listFilter, addTask, deleteAllTasks, removeTask, setTaskNewStatus, tasks, changeTodolistFilter, deleteTodolist }: TodolistPropsType) => {
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [errorTitle, setErrorTitle] = useState<boolean>(false);

  const tasksList: JSX.Element = tasks.length === 0
    ? <p>Tasks list is empty</p>
    : (
      <ul className='tasks'>
        {tasks.map((t: TaskType) => {
          const removeTaskHandler = () => removeTask(t.id, listId);
          const setTaskNewStatusHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskNewStatus(t.id, e.currentTarget.checked, listId)
          return (
            <li key={t.id}>
              <input
                className='checkbox'
                type="checkbox"
                checked={t.isDone}
                onChange={setTaskNewStatusHandler}
              />
              <span className={t.isDone ? 'titleDone' : ''}>{t.title}</span>
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

  const isTaskTitleLengthValid = taskTitle.length < 15;

  const addTaskHandler = () => {
    const trimmedTaskTitle = taskTitle.trim();
    if (trimmedTaskTitle) {
      if (isTaskTitleLengthValid) {
        addTask(taskTitle, listId);
        setTaskTitle('')
      }
    } else {
      setErrorTitle(true);
      setTaskTitle('');
    }
    // (trimmedTaskTitle && isTaskTitleLengthValid) ? addTask(taskTitle, listId) : setErrorTitle(true);
    // setTaskTitle('');
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
    errorTitle && setErrorTitle(false);
  }
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && addTaskHandler();

  };
  const deleteAllTasksHandler = () => deleteAllTasks(listId);

  return (
    <div className='todolist'>
      <h3>
        {title}
        <Button title={'x'} onClick={() => deleteTodolist(listId)} />
      </h3>
      <div>
        <input
          className={errorTitle ? 'input error' : 'input'}
          value={taskTitle}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
          placeholder={'Max 15 characters'}
        />
        <Button
          title={'+'}
          onClick={addTaskHandler}
          disabled={!isTaskTitleLengthValid}
        />
      </div>
      {!isTaskTitleLengthValid && <div style={{ color: 'yellow' }}>Max number of characters is 15</div>}
      {errorTitle && <div style={{ color: 'yellow' }}>Title is required</div>}
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
          onClick={() => changeTodolistFilter('all', listId)}
        />
        <Button
          className={listFilter === 'active' ? 'button-active' : ''}
          title={'Active'}
          onClick={() => changeTodolistFilter('active', listId)}
        />
        <Button
          className={listFilter === 'completed' ? 'button-active' : ''}
          title={'Completed'}
          onClick={() => changeTodolistFilter('completed', listId)}
        />
        <Button
          className={listFilter === 'firstThree' ? 'button-active' : ''}
          title={'First three tasks'}
          onClick={() => changeTodolistFilter('firstThree', listId)}
        />
      </div>
    </div>
  )
}
