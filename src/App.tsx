import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './components/Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed' | 'firstThree'

function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), isDone: true, title: 'HTML&CSS' },
    { id: v1(), isDone: true, title: 'JS' },
    { id: v1(), isDone: false, title: 'React' },
    { id: v1(), isDone: false, title: 'Redux' },
    { id: v1(), isDone: false, title: 'ReduxToolkit' },
  ]);

  const removeTask = (taskId: string) => {
    const nextState: Array<TaskType> = tasks.filter((t) => t.id !== taskId);
    setTasks(nextState);
  }
  const deleteAllTasks = () => {
    setTasks([]);
  }
  const addTask = (taskTitle: string) => {
    const newTask = { id: v1(), isDone: false, title: taskTitle }
    const nextState: Array<TaskType> = [newTask, ...tasks];
    setTasks(nextState);
  }

  return (
    <div className='App'>
      <Todolist
        title={'What to learn'}
        tasks={tasks}
        removeTask={removeTask}
        deleteAllTasks={deleteAllTasks}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
