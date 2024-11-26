import Button from '@mui/material/Button';
import {Box} from '@mui/material';
import {changeTodolistFilterAC} from '../../../../model/todolists-reducer';
import {useAppDispatch} from '../../../../../../app/hooks';
import {deleteAllTasksAC} from '../../../../model/tasks-reducer';
import type {FilterValuesType, TodolistType} from '../../../../../../app/App';

type Props = {
  todolist: TodolistType
}

export const FilterTasksButtons = ({todolist}: Props) => {
  const dispatch = useAppDispatch()

  const changeTodolistFilter = (filter: FilterValuesType) => {
    dispatch(changeTodolistFilterAC({filter, todolistId: todolist.id}))
  }
  const deleteAllTasks = () => {
    dispatch(deleteAllTasksAC(todolist.id))
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
      <Button
        variant="contained"
        size="small"
        onClick={deleteAllTasks}
      >Delete all tasks</Button>
      <Box display={'flex'} gap={'10px'} flexWrap={'wrap'}>
        <Button
          variant="contained"
          size="small"
          color={todolist.filter === 'all' ? 'secondary' : 'primary'}
          onClick={() => changeTodolistFilter('all')}
        >All</Button>
        <Button
          variant="contained"
          size="small"
          color={todolist.filter === 'active' ? 'secondary' : 'primary'}
          onClick={() => changeTodolistFilter('active')}
        >Active</Button>
        <Button
          variant="contained"
          size="small"
          color={todolist.filter === 'completed' ? 'secondary' : 'primary'}
          onClick={() => changeTodolistFilter('completed')}
        >Completed</Button>
        <Button
          variant="contained"
          size="small"
          color={todolist.filter === 'firstThree' ? 'secondary' : 'primary'}
          onClick={() => changeTodolistFilter('firstThree')}
        >First three tasks</Button>
      </Box>
    </Box>
  )
}