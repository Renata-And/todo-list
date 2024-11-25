import { useState } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC } from '../model/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteAllTasksAC, removeTaskAC } from '../model/tasks-reducer';
import { TaskType, Todolist } from '../components/Todolist';
import { AddItemForm } from '../components/AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container, createTheme, CssBaseline, Grid2, Paper, Switch, ThemeProvider } from '@mui/material';
import { orange, deepPurple } from '@mui/material/colors';

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type TasksState = {
  [todolistId: string]: TaskType[]
}
export type FilterValuesType = 'all' | 'active' | 'completed' | 'firstThree'

function AppWithRedux() {
  const todolists = useAppSelector(state => state.todolists)
  const tasks = useAppSelector(state => state.tasks)
  const dispatch = useAppDispatch();

  // Theme
  const [isDark, setIsDark] = useState(false)
  const theme = createTheme({
    palette: {
      primary: deepPurple,
      secondary: orange,
      mode: isDark ? 'dark' : 'light'
    },
  })
  const onChangeHandler = () => {
    setIsDark(prev => !prev)
  }

  // Tasks
  const removeTask = (taskId: string, todolistId: string) => {
    dispatch(removeTaskAC({ taskId, todolistId }))
  }
  const deleteAllTasks = (todolistId: string) => {
    dispatch(deleteAllTasksAC(todolistId))
  }
  const addTask = (taskTitle: string, todolistId: string) => {
    dispatch(addTaskAC({ title: taskTitle, todolistId }))
  }
  const setTaskNewStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    dispatch(changeTaskStatusAC({ taskId, isDone, todolistId }))
  }
  const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
    dispatch(changeTaskTitleAC({ taskId, title, todolistId }));
  }

  // Lists
  const changeTodolistFilter = (newFilter: FilterValuesType, todolistId: string) => {
    dispatch(changeTodolistFilterAC({ newFilter, todolistId }))
  }
  const changeTodolistTitle = (title: string, todolistId: string) => {
    dispatch(changeTodolistTitleAC({ title, todolistId }))
  }
  const deleteTodolist = (todolistId: string) => {
    dispatch(deleteTodolistAC(todolistId));

  }
  const addTodolist = (title: string) => {
    dispatch(addTodolistAC(title))
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Button color="inherit" variant="outlined">Login</Button>
            <Switch sx={{ marginLeft: 'auto' }} onChange={onChangeHandler} />
          </Toolbar>
        </AppBar>
        <Container>
          <Grid2 container sx={{ p: '15px 0' }}>
            <AddItemForm addItem={addTodolist} />
          </Grid2>
          <Grid2 container spacing={2}>
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
                return (
                  <Grid2 sx={{ width: '300px' }} key={tl.id}>
                    <Paper elevation={4} sx={{ p: '15px' }}>
                      <Todolist
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
                    </Paper>
                  </Grid2>
                )
              })
            }
          </Grid2>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default AppWithRedux;
