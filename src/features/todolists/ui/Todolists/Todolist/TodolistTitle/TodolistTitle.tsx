import {EditableSpan} from 'common/components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Typography} from '@mui/material';
import {changeTodolistTitleAC, deleteTodolistAC} from '../../../../model/todolists-reducer';
import {useAppDispatch} from '../../../../../../app/hooks';
import type {TodolistType} from '../../../../../../app/App';

type Props = {
  todolist: TodolistType
}

export const TodolistTitle = ({todolist}: Props) => {
  const dispatch = useAppDispatch()
  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleAC({todolistId: todolist.id, title}))
  }
  const deleteTodolist = () => {
    dispatch(deleteTodolistAC(todolist.id));
  }

  return (
    <Typography variant="h5" component="h3" textAlign={'center'} style={{ margin: '5px 0 15px 0' }}>
      <EditableSpan value={todolist.title} onChange={changeTodolistTitle} />
      <IconButton aria-label="delete" onClick={deleteTodolist}>
        <DeleteIcon />
      </IconButton>
    </Typography>
  )
}