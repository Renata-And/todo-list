import { ChangeEvent } from 'react'
import { FilterValuesType } from '../App'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Box, Grid2, Typography } from '@mui/material'

type TodolistPropsType = {
  listId: string
  title: string
  listFilter: string
  tasks: TaskType[]
  removeTask: (taskId: string, todolistId: string) => void
  deleteAllTasks: (todolistId: string) => void
  addTask: (taskTitle: string, todolistId: string) => void
  setTaskNewStatus: (taskId: string, newStatus: boolean, todolistId: string) => void
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
  changeTodolistFilter: (newFilter: FilterValuesType, todolistId: string) => void
  changeTodolistTitle: (title: string, todolistId: string) => void
  deleteTodolist: (todolistId: string) => void
}

export type TaskType = {
  id: string
  isDone: boolean
  title: string
}

export const Todolist = ({ listId, title, listFilter, addTask, deleteAllTasks, removeTask, setTaskNewStatus, changeTaskTitle, tasks, changeTodolistFilter, changeTodolistTitle, deleteTodolist }: TodolistPropsType) => {

  const tasksList: JSX.Element = tasks.length === 0
    ? <p>Tasks list is empty</p>
    : (
      <List className='tasks'>
        {tasks.map((t: TaskType) => {
          const removeTaskHandler = () => removeTask(t.id, listId);
          const setTaskNewStatusHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskNewStatus(t.id, e.currentTarget.checked, listId);
          const changeTaskTitleHandler = (title: string) => {
            changeTaskTitle(t.id, title, listId)
          }
          return (
            <ListItem
              key={t.id}
              sx={{ justifyContent: 'space-between', opacity: t.isDone ? 0.5 : 1 }}
              disablePadding
            >
              <Box>
                <Checkbox checked={t.isDone} onChange={setTaskNewStatusHandler} />
                <EditableSpan title={t.title} changeTitle={changeTaskTitleHandler} className={t.isDone ? 'titleDone' : ''} />
              </Box>
              <IconButton aria-label="delete" onClick={removeTaskHandler} size='small'>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          )
        })}
      </List>
    )

  const addTaskHandler = (taskTitle: string) => addTask(taskTitle, listId);
  const deleteAllTasksHandler = () => deleteAllTasks(listId);

  const changeTodolistFilterTaskHandler = (filter: FilterValuesType) => {
    changeTodolistFilter(filter, listId)
  }
  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle(title, listId)
  }

  return (
    <div className='todolist'>
      <Typography variant="h5" component="h3" textAlign={'center'} style={{ margin: '5px 0 15px 0' }}>
        <EditableSpan title={title} changeTitle={changeTodolistTitleHandler} />
        <IconButton aria-label="delete" onClick={() => deleteTodolist(listId)}>
          <DeleteIcon />
        </IconButton>
      </Typography>
      <AddItemForm addItem={addTaskHandler} />
      {tasksList}
      <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
        <Button
          variant='contained'
          size='small'
          onClick={deleteAllTasksHandler}
        >Delete all tasks</Button>
        <Box display={'flex'} gap={'10px'} flexWrap={'wrap'}>
          <Button
            variant='contained'
            size='small'
            color={listFilter === 'all' ? 'secondary' : 'primary'}
            onClick={() => changeTodolistFilterTaskHandler('all')}
          >All</Button>
          <Button
            variant='contained'
            size='small'
            color={listFilter === 'active' ? 'secondary' : 'primary'}
            onClick={() => changeTodolistFilterTaskHandler('active')}
          >Active</Button>
          <Button
            variant='contained'
            size='small'
            color={listFilter === 'completed' ? 'secondary' : 'primary'}
            onClick={() => changeTodolistFilterTaskHandler('completed')}
          >Completed</Button>
          <Button
            variant='contained'
            size='small'
            color={listFilter === 'firstThree' ? 'secondary' : 'primary'}
            onClick={() => changeTodolistFilterTaskHandler('firstThree')}
          >First three tasks</Button>
        </Box>
      </Box>
    </div>
  )
}
