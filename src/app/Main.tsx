import { Container, Grid2 } from "@mui/material"
import { AddItemForm } from "common/components"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { useAppSelector } from "./hooks"
import { Navigate } from "react-router"
import { PATH } from "common/routing"
import { selectIsLoggedIn } from "./appSlice"
import { useAddTodolistMutation } from "../features/todolists/api/todolistsApi"

export const Main = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const [createTodolist] = useAddTodolistMutation()

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  const addTodolistHandler = (title: string) => {
    createTodolist(title)
  }
  return (
    <Container>
      <Grid2 container sx={{ p: "15px 0" }}>
        <AddItemForm addItem={addTodolistHandler} />
      </Grid2>
      <Grid2 container spacing={2}>
        <Todolists />
      </Grid2>
    </Container>
  )
}
