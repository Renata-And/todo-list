import {useAppSelector} from './hooks';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {Header} from '../common/components/Header/Header';
import {Main} from './Main';
import {getTheme} from '../common/theme';
import type {TaskType} from '../features/todolists/ui/Todolists/Todolist/Todolist';
import type {RootState} from './store';
import {selectThemeMode} from './app-selectors';

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
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Header/>
        <Main/>
      </ThemeProvider>
    </div>
  );
}

export default AppWithRedux;

