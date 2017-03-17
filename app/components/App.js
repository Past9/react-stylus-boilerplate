import React from "react"
import Footer from "./Footer"
import AddTodo from "../containers/AddTodo"
import VisibleTodoList from "../containers/VisibleTodoList"

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <a href="/#/">Home</a>
    <br />
    <a href="/#/help">Help</a>
    <br />
    <a href="/#/login">Login</a>
  </div>
)

export default App
