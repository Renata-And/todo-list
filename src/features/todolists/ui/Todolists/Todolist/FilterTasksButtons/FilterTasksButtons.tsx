import Button from "@mui/material/Button"
import { Box } from "@mui/material"
import { useAppDispatch } from "../../../../../../app/hooks"
import { todolistsApi } from "../../../../api/todolistsApi"
import type { DomainTodolist, FilterValues } from "../../../../lib/types"

type Props = {
  todolist: DomainTodolist
}

export const FilterTasksButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist
  const dispatch = useAppDispatch()

  const changeTodolistFilterHandler = (filter: FilterValues) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (todolists) => {
        const todolist = todolists.find((tl) => tl.id === id)
        if (todolist) {
          todolist.filter = filter
        }
      }),
    )
  }

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
      <Box display={"flex"} gap={"10px"} flexWrap={"wrap"}>
        <Button
          variant="contained"
          size="small"
          color={filter === "all" ? "secondary" : "primary"}
          onClick={() => changeTodolistFilterHandler("all")}
        >
          All
        </Button>
        <Button
          variant="contained"
          size="small"
          color={filter === "active" ? "secondary" : "primary"}
          onClick={() => changeTodolistFilterHandler("active")}
        >
          Active
        </Button>
        <Button
          variant="contained"
          size="small"
          color={filter === "completed" ? "secondary" : "primary"}
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
