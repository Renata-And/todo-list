import { Container, Grid2 } from "@mui/material"
import { AddItemForm } from "common/components"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { addTodolistTC } from "../features/todolists/model/todolistsSlice"
import { useAppDispatch, useAppSelector } from "./hooks"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { PATH } from "common/routing"
import { selectIsLoggedIn } from "../features/auth/model/authSlice"

export const Main = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(PATH.LOGIN)
    }
  }, [isLoggedIn])

  const addTodolist = (title: string) => {
    dispatch(addTodolistTC(title))
  }
  return (
    <Container>
      <Grid2 container sx={{ p: "15px 0" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid2>
      <Grid2 container spacing={2}>
        <Todolists />
      </Grid2>
    </Container>
  )
}
