import { FilterValuesType, TodolistType } from '../app/App';
import { v1 } from 'uuid';

// export const todolistId_1 = v1();
// export const todolistId_2 = v1();

const initialState: TodolistType[] = [];

export const todolistsReducer = (state: TodolistType[] = initialState, action: TodolistsActionType): TodolistType[] => {
  switch (action.type) {
    case 'DELETE_TODOLIST':
      return state.filter(tl => tl.id !== action.payload.todolistId);
    case 'ADD_TODOLIST':
      return [{
        id: action.payload.id,
        title: action.payload.title,
        filter: 'all'
      }, ...state];
    case 'CHANGE_TODOLIST_FILTER':
      return state.map(tl => tl.id === action.payload.todolistId ? {
        ...tl,
        filter: action.payload.newFilter
      } : tl);
    case 'CHANGE_TODOLIST_TITLE':
      return state.map(tl => tl.id === action.payload.todolistId ? { ...tl, title: action.payload.title } : tl)
    default:
      return state;
  }
}

// Actions types
export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>

type TodolistsActionType =
  DeleteTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistFilterActionType
  | ChangeTodolistTitleActionType

// Action creators
export const deleteTodolistAC = (todolistId: string) => {
  return { type: 'DELETE_TODOLIST', payload: { todolistId } } as const
}
export const addTodolistAC = (title: string) => {
  return { type: 'ADD_TODOLIST', payload: { title, id: v1() } } as const
}
export const changeTodolistFilterAC = (payload: { newFilter: FilterValuesType, todolistId: string }) => {
  return { type: 'CHANGE_TODOLIST_FILTER', payload } as const
}
export const changeTodolistTitleAC = (payload: { title: string, todolistId: string }) => {
  return { type: 'CHANGE_TODOLIST_TITLE', payload } as const
}

