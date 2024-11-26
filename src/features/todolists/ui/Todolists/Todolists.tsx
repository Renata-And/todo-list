import {Todolist} from './Todolist/Todolist';
import {Grid2, Paper} from '@mui/material';
import {useAppSelector} from '../../../../app/hooks';
import {selectTodolists} from '../../model/todolisis-selectors';

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)
  return (
    <>
      {todolists.map(tl => (
        <Grid2 sx={{width: '300px'}} key={tl.id}>
          <Paper elevation={4} sx={{p: '15px'}}>
            <Todolist todolist={tl}/>
          </Paper>
        </Grid2>
      ))}
    </>
  )
}