import { Todolist } from "./Todolist/Todolist"
import { Grid2, Paper } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { selectTodolists } from "../../model/todolisis-selectors"
import { useEffect } from "react"
import { fetchTodolistsTC } from "../../model/todolists-reducer"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <>
      {todolists.map((tl) => (
        <Grid2 sx={{ width: "300px" }} key={tl.id}>
          <Paper elevation={4} sx={{ p: "15px" }}>
            <Todolist todolist={tl} />
          </Paper>
        </Grid2>
      ))}
    </>
  )
}
