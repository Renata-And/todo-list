import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    todolistsReducer
} from './todolists-reducer'
import {v1} from 'uuid'
import {FilterValuesType, TodolistType} from '../App'

test('correct todolist should be deleted', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
    const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'}
    ]
    const newTodolistTitle = 'Menu for New Year 2025'
    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle, todolistId2))

    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('todolist filter type should be changed correct', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
    const newFilter: FilterValuesType = 'completed'
    const newState = todolistsReducer(startState, changeTodolistFilterAC(newFilter, todolistId1))

    expect(newState[0].filter).toBe(newFilter)
    expect(newState[1].filter).toBe('all')
})

test('todolist title should be changed correct', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
    const newTitle = 'New title'
    const endState = todolistsReducer(startState, changeTodolistTitleAC(newTitle, todolistId2))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTitle)
})