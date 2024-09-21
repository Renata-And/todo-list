import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './components/Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
  const title = 'What to learn';
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: 1, isDone: true, title: 'HTML&CSS' },
    { id: 2, isDone: true, title: 'JS' },
    { id: 3, isDone: false, title: 'React' }
  ]);
  const removeTask = (taskId: number) => {
    const nextState: Array<TaskType> = tasks.filter((t) => t.id !== taskId);
    setTasks(nextState);
  }

  // GUI

  const [filter, setFilter] = useState<FilterValuesType>('all');

  let filteredTasks: Array<TaskType> = tasks;
  if (filter === 'active') {
    filteredTasks = tasks.filter(t => !t.isDone)
  }
  if (filter === 'completed') {
    filteredTasks = tasks.filter(t => t.isDone)
  }

  const changeFilter = (newFilter: FilterValuesType) => setFilter(newFilter);

  return (
    <div className='App'>
      <Todolist
        title={title}
        tasks={filteredTasks}
        removeTask={removeTask}
        changeFilter={changeFilter} />
    </div>
  );
}

export default App;
