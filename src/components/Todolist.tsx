import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Button } from './Button'
import { FilterValuesType } from '../App'

type TodolistPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  deleteAllTasks: () => void
  addTask: (taskTitle: string) => void
  setTaskNewStatus: (taskId: string, newStatus: boolean) => void
}

export type TaskType = {
  id: string
  isDone: boolean
  title: string
}

export const Todolist = ({ addTask, deleteAllTasks, removeTask, setTaskNewStatus, tasks, title }: TodolistPropsType) => {
  const [filter, setFilter] = useState<FilterValuesType>('all');
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [errorTitle, setErrorTitle] = useState<boolean>(false);

  let filteredTasks: Array<TaskType> = tasks;
  switch (filter) {
    case 'active':
      filteredTasks = tasks.filter(t => !t.isDone)
      break;
    case 'completed':
      filteredTasks = tasks.filter(t => t.isDone)
      break;
    case 'firstThree':
      filteredTasks = tasks.filter((t, i) => i === 0 || i === 1 || i === 2)
      break;
  }

  const changeFilter = (newFilter: FilterValuesType) => setFilter(newFilter);

  const tasksList: JSX.Element = tasks.length === 0
    ? <p>Tasks list is empty</p>
    : (
      <ul className='tasks'>
        {filteredTasks.map((t: TaskType) => {
          const removeTaskHandler = () => removeTask(t.id);
          const setTaskNewStatusHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskNewStatus(t.id, e.currentTarget.checked)
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
    (trimmedTaskTitle && isTaskTitleLengthValid) ? addTask(taskTitle) : setErrorTitle(true);
    setTaskTitle('');
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
    errorTitle && setErrorTitle(false);
  }
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && addTaskHandler();

  };
  const deleteAllTasksHandler = () => deleteAllTasks();

  return (
    <div className='todolist'>
      <h3>{title}</h3>
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
          className={filter === 'all' ? 'button-active' : ''}
          title={'All'}
          onClick={() => changeFilter('all')}
        />
        <Button
          className={filter === 'active' ? 'button-active' : ''}
          title={'Active'}
          onClick={() => changeFilter('active')}
        />
        <Button
          className={filter === 'completed' ? 'button-active' : ''}
          title={'Completed'}
          onClick={() => changeFilter('completed')}
        />
        <Button
          className={filter === 'firstThree' ? 'button-active' : ''}
          title={'First three tasks'}
          onClick={() => changeFilter('firstThree')}
        />
      </div>
    </div>
  )
}
