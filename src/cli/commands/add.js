import addToDB from "../../db/add.js"
import printTodo from "../utils/printTodo.js"

const add = async (description) => {
  const todo = await addToDB(description)

  printTodo(todo)
}

export default add
