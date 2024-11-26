import {Container, Grid2} from '@mui/material';
import {AddItemForm} from '../common/components/AddItemForm/AddItemForm';
import {Todolists} from '../features/todolists/ui/Todolists/Todolists';
import {addTodolistAC} from '../features/todolists/model/todolists-reducer';
import {useAppDispatch} from './hooks';

export const Main = () => {
  const dispatch = useAppDispatch()
  const addTodolist = (title: string) => {
    dispatch(addTodolistAC(title))
  }
  return (
    <Container>
      <Grid2 container sx={{p: '15px 0'}}>
        <AddItemForm addItem={addTodolist}/>
      </Grid2>
      <Grid2 container spacing={2}>
        <Todolists/>
      </Grid2>
    </Container>
  )
}
