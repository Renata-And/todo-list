import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './components/Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './components/AddItemForm';

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type TaskState = {
  [todolistId: string]: TaskType[]
}
export type FilterValuesType = 'all' | 'active' | 'completed' | 'firstThree'

function App() {
  const todolistId_1 = v1();
  const todolistId_2 = v1();

  const [todolists, setTodolists] = useState<TodolistType[]>([
    {
      id: todolistId_1,
      title: 'What to learn',
      filter: 'all',
    },
    {
      id: todolistId_2,
      title: 'What to buy',
      filter: 'active',
    },
  ])
  const [tasks, setTasks] = useState<TaskState>({
    [todolistId_1]: [
      { id: v1(), isDone: true, title: 'HTML&CSS' },
      { id: v1(), isDone: true, title: 'JS' },
      { id: v1(), isDone: false, title: 'React' },
      { id: v1(), isDone: false, title: 'Redux' },
      { id: v1(), isDone: false, title: 'ReduxToolkit' },
    ],
    [todolistId_2]: [
      { id: v1(), isDone: true, title: 'Milk' },
      { id: v1(), isDone: true, title: 'Bread' },
      { id: v1(), isDone: false, title: 'Apples' },

    ],
  });

  // Tasks

  const removeTask = (taskId: string, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
    })
  }
  const deleteAllTasks = (todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: []
    });
  }
  const addTask = (taskTitle: string, todolistId: string) => {
    const newTask = { id: v1(), isDone: false, title: taskTitle }
    setTasks({
      ...tasks,
      [todolistId]: [newTask, ...tasks[todolistId]]
    });
  }
  const setTaskNewStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(t => t.id === taskId ? { ...t, isDone } : t)
    });
  }
  const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(t => t.id === taskId ? { ...t, title } : t)
    });
  }

  // Lists
  const changeTodolistFilter = (newFilter: FilterValuesType, todolistId: string) => {
    setTodolists(
      todolists.map(tl => tl.id === todolistId ? { ...tl, filter: newFilter } : tl)
    )
  };
  const changeTodolistTitle = (title: string, todolistId: string) => {
    setTodolists(
      todolists.map(tl => tl.id === todolistId ? { ...tl, title } : tl)
    )
  };
  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId));
    delete tasks[todolistId]
  }
  const addTodolist = (title: string) => {
    const todolistId = v1();
    const newTodolist: TodolistType = {
      id: todolistId,
      title: title,
      filter: 'all'
    }
    setTodolists([...todolists, newTodolist]);
    setTasks({ ...tasks, [todolistId]: [] })
  }

  return (
    <div className='App'>
      <AddItemForm addItem={addTodolist} />
      {
        todolists.map(tl => {
          let filteredTasks: TaskType[] = tasks[tl.id];
          switch (tl.filter) {
            case 'active':
              filteredTasks = filteredTasks.filter(t => !t.isDone)
              break;
            case 'completed':
              filteredTasks = filteredTasks.filter(t => t.isDone)
              break;
            case 'firstThree':
              filteredTasks = filteredTasks.filter((t, i) => i === 0 || i === 1 || i === 2)
              break;
          }
          return <Todolist
            key={tl.id}
            listId={tl.id}
            listFilter={tl.filter}
            title={tl.title}
            tasks={filteredTasks}
            removeTask={removeTask}
            deleteAllTasks={deleteAllTasks}
            addTask={addTask}
            setTaskNewStatus={setTaskNewStatus}
            changeTaskTitle={changeTaskTitle}
            changeTodolistFilter={changeTodolistFilter}
            changeTodolistTitle={changeTodolistTitle}
            deleteTodolist={deleteTodolist}
          />
        })
      }
    </div>
  );
}

export default App;
