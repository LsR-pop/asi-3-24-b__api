import addToDB from "../../db/add.js"
import printTodo from "../utils/printTodo.js"

const add = (description) => {
  const todo = addToDB(description)

  printTodo(todo)
}

export default add
