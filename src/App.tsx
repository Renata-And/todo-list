import React from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';

function App() {

  const title1 = 'What to learn';
  const title2 = 'What to buy';
  const tasks1: Array<TaskType> = [
    { id: 1, isDone: true, title: 'HTML&CSS' },
    { id: 2, isDone: true, title: 'JS' },
    { id: 3, isDone: false, title: 'React' }
  ];
  const tasks2: Array<TaskType> = [
    { id: 4, isDone: true, title: 'milk' },
    { id: 5, isDone: true, title: 'bread' },
    { id: 6, isDone: false, title: 'juice' }
  ];

  return (
    <div className='App'>
      <Todolist title={title1} tasks={tasks1} />
      <Todolist title={title2} tasks={tasks2} />
    </div>
  );
}

export default App;
