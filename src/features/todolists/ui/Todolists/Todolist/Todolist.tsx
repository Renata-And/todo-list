import {AddItemForm} from '../../../../../common/components/AddItemForm/AddItemForm'
import {TodolistTitle} from './TodolistTitle/TodolistTitle';
import {FilterTasksButtons} from './FilterTasksButtons/FilterTasksButtons';
import {Tasks} from './Tasks/Tasks';
import {addTaskAC} from '../../../model/tasks-reducer';
import {useAppDispatch} from '../../../../../app/hooks';
import type {TodolistType} from '../../../../../app/App';

type TodolistPropsType = {
  todolist: TodolistType
}

export type TaskType = {
  id: string
  isDone: boolean
  title: string
}

export const Todolist = ({todolist}: TodolistPropsType) => {
  const dispatch = useAppDispatch()
  const addTask = (taskTitle: string) => {
    dispatch(addTaskAC({title: taskTitle, todolistId: todolist.id}))
  }

  return (
    <div className="todolist">
      <TodolistTitle todolist={todolist}/>
      <AddItemForm addItem={addTask}/>
      <Tasks todolist={todolist}/>
      <FilterTasksButtons todolist={todolist}/>
    </div>
  )
}
