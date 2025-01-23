import { Todolist } from "./Todolist/Todolist"
import { Grid2, Paper } from "@mui/material"
import { useGetTodolistsQuery } from "../../api/todolistsApi"

export const Todolists = () => {
  const data = useGetTodolistsQuery()

  return (
    <>
      {data.data?.map((tl) => (
        <Grid2 sx={{ width: "300px" }} key={tl.id}>
          <Paper elevation={4} sx={{ p: "15px" }}>
            <Todolist todolist={tl} />
          </Paper>
        </Grid2>
      ))}
    </>
  )
}
