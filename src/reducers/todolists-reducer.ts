import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

export const todolistId_1 = v1();
export const todolistId_2 = v1();

const initialState: TodolistType[] = [
  {
    id: todolistId_1,
    title: 'What to learn',
    filter: 'all',
  },
  {
    id: todolistId_2,
    title: 'What to buy',
    filter: 'active',
  },
];

export const todolistsReducer = (state: TodolistType[] = initialState, action: TodolistsActionType): TodolistType[] => {
  switch (action.type) {
    case 'DELETE_TODOLIST':
      return state.filter(tl => tl.id !== action.payload.todolistId);
    case 'ADD_TODOLIST':
      return [...state, {
        id: v1(),
        title: action.payload.title,
        filter: 'all'
      }];
    case 'CHANGE_TODOLIST_FILTER':
      return state.map(tl => tl.id === action.payload.todolistId ? {
        ...tl,
        filter: action.payload.newFilter
      } : tl);
    case 'CHANGE_TODOLIST_TITLE':
      return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
    default:
      throw new Error('Incorrect action type');
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
  return {type: 'DELETE_TODOLIST', payload: {todolistId}} as const
}
export const addTodolistAC = (title: string) => {
  return {type: 'ADD_TODOLIST', payload: {title}} as const
}
export const changeTodolistFilterAC = (payload: {newFilter: FilterValuesType, todolistId: string}) => {
  return {type: 'CHANGE_TODOLIST_FILTER', payload} as const
}
export const changeTodolistTitleAC = (payload: {title: string, todolistId: string}) => {
  return {type: 'CHANGE_TODOLIST_TITLE', payload} as const
}

