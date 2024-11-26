import { addTodolistAC, todolistsReducer } from '../todolists-reducer';
import { tasksReducer } from '../tasks-reducer';
import type {TasksState, TodolistType} from '../../../../app/App';

test('ids should be equals', () => {
  const startTasksState: TasksState = {}
  const startTodolistsState: TodolistType[] = []

  const action = addTodolistAC('new todolist')

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.id)
  expect(idFromTodolists).toBe(action.payload.id)
})