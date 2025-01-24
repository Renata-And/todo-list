import { Container, Grid2 } from "@mui/material"
import { AddItemForm } from "common/components"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { useAppSelector } from "./hooks"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { PATH } from "common/routing"
import { useCreateTodolistMutation } from "../features/todolists/api/todolistsApi"
import { selectIsLoggedIn } from "./appSlice"

export const Main = () => {
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const [createTodolist] = useCreateTodolistMutation()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(PATH.LOGIN)
    }
  }, [isLoggedIn, navigate])

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
