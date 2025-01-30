import { Todolist } from "./Todolist/Todolist"
import { Grid2, Paper } from "@mui/material"
import { useGetTodolistsQuery } from "../../api/todolistsApi"
import { TodolistSkeleton } from "../skeletons/TodolistSkeleton/TodolistSkeleton"

export const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery()

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "space-between", gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </div>
    )
  }

  return (
    <>
      {todolists?.map((tl) => (
        <Grid2 sx={{ width: "300px" }} key={tl.id}>
          <Paper elevation={4} sx={{ p: "15px" }}>
            <Todolist todolist={tl} />
          </Paper>
        </Grid2>
      ))}
    </>
  )
}
