import {Box} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from '../../../../../../../common/components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';
import {ChangeEvent} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../../../../../model/tasks-reducer';
import {useAppDispatch} from '../../../../../../../app/hooks';
import type {TaskType} from '../../Todolist';
import type {TodolistType} from '../../../../../../../app/App';

type Props = {
  task: TaskType
  todolist: TodolistType
}

export const Task = ({task, todolist}: Props) => {
  const dispatch = useAppDispatch()

  const removeTask = () => {
    dispatch(removeTaskAC({taskId: task.id, todolistId: todolist.id}))
  }
  const setTaskNewStatus = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskStatusAC({taskId: task.id, isDone: e.currentTarget.checked, todolistId: todolist.id}))
  }
  const changeTaskTitle = (title: string) => {
    dispatch(changeTaskTitleAC({taskId: task.id, title, todolistId: todolist.id}));
  }

  return (
    <ListItem
      sx={{justifyContent: 'space-between', opacity: task.isDone ? 0.5 : 1}}
      disablePadding
    >
      <Box>
        <Checkbox checked={task.isDone} onChange={setTaskNewStatus}/>
        <EditableSpan value={task.title} changeTitle={changeTaskTitle}
                      className={task.isDone ? 'titleDone' : ''}/>
      </Box>
      <IconButton aria-label="delete" onClick={removeTask} size="small">
        <DeleteIcon/>
      </IconButton>
    </ListItem>
  )
}