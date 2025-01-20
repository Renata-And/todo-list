import Button from "@mui/material/Button"
import { Box } from "@mui/material"
import { changeTodolistFilter, type DomainTodolist, type FilterValuesType } from "../../../../model/todolistsSlice"
import { useAppDispatch } from "../../../../../../app/hooks"

type Props = {
  todolist: DomainTodolist
}

export const FilterTasksButtons = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const changeTodolistFilterHandler = (filter: FilterValuesType) => {
    dispatch(changeTodolistFilter({ id: todolist.id, filter }))
  }

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
      <Box display={"flex"} gap={"10px"} flexWrap={"wrap"}>
        <Button
          variant="contained"
          size="small"
          color={todolist.filter === "all" ? "secondary" : "primary"}
          onClick={() => changeTodolistFilterHandler("all")}
        >
          All
        </Button>
        <Button
          variant="contained"
          size="small"
          color={todolist.filter === "active" ? "secondary" : "primary"}
          onClick={() => changeTodolistFilterHandler("active")}
        >
          Active
        </Button>
        <Button
          variant="contained"
          size="small"
          color={todolist.filter === "completed" ? "secondary" : "primary"}
          onClick={() => changeTodolistFilterHandler("completed")}
        >
          Completed
        </Button>
        <Button
          variant="contained"
          size="small"
          color={todolist.filter === "firstThree" ? "secondary" : "primary"}
          onClick={() => changeTodolistFilterHandler("firstThree")}
        >
          First three tasks
        </Button>
      </Box>
    </Box>
  )
}
