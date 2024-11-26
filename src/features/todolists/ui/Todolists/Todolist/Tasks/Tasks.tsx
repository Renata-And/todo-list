import List from '@mui/material/List';
import {useAppSelector} from '../../../../../../app/hooks';
import {Task} from './Task/Task';
import type {TodolistType} from '../../../../../../app/App';
import type {TaskType} from '../Todolist';
import {selectTasks} from '../../../../model/tasks-selectors';

type Props = {
  todolist: TodolistType
}

export const Tasks = ({todolist}: Props) => {
  const tasks = useAppSelector(selectTasks)

  let filteredTasks: TaskType[] = tasks[todolist.id];
  switch (todolist.filter) {
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
  return (
    <>
      {
        filteredTasks.length === 0
          ? <p>Tasks list is empty</p>
          : (
            <List className="tasks">
              {filteredTasks.map((t: TaskType) => <Task key={t.id} task={t} todolist={todolist}/>)}
            </List>
          )
      }
    </>
  )
}