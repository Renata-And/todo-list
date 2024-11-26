import { TasksState } from '../../../app/App';
import { v1 } from 'uuid';
import type {AddTodolistActionType, DeleteTodolistActionType} from './todolists-reducer';

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: TasksActionType): TasksState => {
  switch (action.type) {
    case 'REMOVE_TASK': {
      const { taskId, todolistId } = action.payload;
      return {
        ...state,
        [todolistId]: state[todolistId].filter(t => t.id !== taskId)
      };
    }
    case 'ADD_TASK': {
      const { todolistId, title } = action.payload;
      return {
        ...state,
        [todolistId]: [{ id: v1(), title, isDone: false }, ...state[todolistId]]
      }
    }
    case 'CHANGE_TASK_STATUS': {
      const { todolistId, taskId, isDone } = action.payload;
      return {
        ...state,
        [todolistId]: state[todolistId].map(t => t.id === taskId ? { ...t, isDone } : t)
      }
    }
    case 'CHANGE_TASK_TITLE': {
      const { todolistId, taskId, title } = action.payload;
      return {
        ...state,
        [todolistId]: state[todolistId].map(t => t.id === taskId ? { ...t, title } : t)
      }
    }
    case 'DELETE_ALL_TASKS': {
      return {
        ...state,
        [action.todolistId]: []
      }
    }
    case 'DELETE_TODOLIST': {
      const newState = { ...state }
      delete newState[action.payload.todolistId]
      return newState
    }
    case 'ADD_TODOLIST': {
      return { ...state, [action.payload.id]: [] }
    }
    default:
      return state;
  }
}

// Actions types
type removeTaskActionType = ReturnType<typeof removeTaskAC>
type addTaskActionType = ReturnType<typeof addTaskAC>
type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
type deleteAllTasksActionType = ReturnType<typeof deleteAllTasksAC>

type TasksActionType =
  removeTaskActionType
  | addTaskActionType
  | changeTaskStatusActionType
  | changeTaskTitleActionType
  | DeleteTodolistActionType
  | AddTodolistActionType
  | deleteAllTasksActionType

// Action creators
export const removeTaskAC = (payload: { todolistId: string, taskId: string }) => {
  return { type: 'REMOVE_TASK', payload } as const
}
export const addTaskAC = (payload: { todolistId: string, title: string }) => {
  return { type: 'ADD_TASK', payload } as const
}
export const changeTaskStatusAC = (payload: { todolistId: string, taskId: string, isDone: boolean }) => {
  return { type: 'CHANGE_TASK_STATUS', payload } as const
}
export const changeTaskTitleAC = (payload: { todolistId: string, taskId: string, title: string }) => {
  return { type: 'CHANGE_TASK_TITLE', payload } as const
}
export const deleteAllTasksAC = (todolistId: string) => {
  return { type: 'DELETE_ALL_TASKS', todolistId } as const
}
