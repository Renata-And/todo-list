import s from "./Page404.module.css"
import Button from "@mui/material/Button"
import { Link } from "react-router"
import { PATH } from "common/routing"

export const Page404 = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>404</h1>
      <h2 className={s.subTitle}>page not found</h2>
      <Button variant="contained" size="large" color={"primary"} component={Link} to={PATH.MAIN}>
        Main page
      </Button>
    </div>
  )
}
