import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Button } from './Button'
import { FilterValuesType } from '../App'

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

export const Todolist = ({ addTask, deleteAllTasks, removeTask, tasks, title }: TodolistPropsType) => {
  const [filter, setFilter] = useState<FilterValuesType>('all');
  const [taskTitle, setTaskTitle] = useState<string>('');

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
          return (
            <li key={t.id}>
              <input type="checkbox" checked={t.isDone} className='checkbox' />
              <span>{t.title}</span>
              <Button
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
    addTask(taskTitle);
    setTaskTitle('');
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value);
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTaskHandler();
    }
  };
  const deleteAllTasksHandler = () => deleteAllTasks();

  return (
    <div className='todolist'>
      <h3>{title}</h3>
      <div>
        <input className='input' value={taskTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} />
        <Button title={'+'} onClick={addTaskHandler} isDisabled={!isTaskTitleLengthValid} />
      </div>
      {!isTaskTitleLengthValid && <div>Max number of characters is 15</div>}
      {tasksList}
      <div>
        <Button title={'Delete all tasks'} onClick={deleteAllTasksHandler} />
      </div>
      <div>
        <Button
          title={'All'}
          onClick={() => changeFilter('all')}
        />
        <Button
          title={'Active'}
          onClick={() => changeFilter('active')}
        />
        <Button
          title={'Completed'}
          onClick={() => changeFilter('completed')}
        />
        <Button
          title={'First three tasks'}
          onClick={() => changeFilter('firstThree')}
        />
      </div>
    </div>
  )
}
