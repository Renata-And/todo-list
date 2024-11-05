import {FilterValuesType, TodolistType} from '../App';

export type DeleteTodolistActionType = {
    type: 'DELETE-TODOLIST'
    payload: {
        todolistId: string
    }
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
        todolistId: string
    }
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        newFilter: FilterValuesType
        todolistId: string
    }
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        title: string
        todolistId: string
    }
}

type TodolistsActionType =
    DeleteTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistFilterActionType
    | ChangeTodolistTitleActionType

export const todolistsReducer = (todolists: TodolistType[], action: TodolistsActionType): TodolistType[] => {
    switch (action.type) {
        case 'DELETE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.payload.todolistId);
        case 'ADD-TODOLIST':
            return [...todolists, {
                id: action.payload.todolistId,
                title: action.payload.title,
                filter: 'all'
            }];
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                filter: action.payload.newFilter
            } : tl);
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
        default:
            throw new Error('Incorrect action type');
    }
}

export const deleteTodolistAC = (todolistId: string): DeleteTodolistActionType => ({
    type: 'DELETE-TODOLIST',
    payload: {
        todolistId
    }
})

export const addTodolistAC = (title: string, todolistId: string): AddTodolistActionType => ({
    type: 'ADD-TODOLIST',
    payload: {
        title,
        todolistId
    }
})

export const changeTodolistFilterAC = (newFilter: FilterValuesType, todolistId: string): ChangeTodolistFilterActionType => ({
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        newFilter,
        todolistId
    }
})

export const changeTodolistTitleAC = (title: string, todolistId: string): ChangeTodolistTitleActionType => ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        title,
        todolistId
    }
})