import removeFromDB from "../../db/remove.js"
import { exitNotFound } from "../utils/exitWithError.js"
import printTodo from "../utils/printTodo.js"

const remove = async (todoId) => {
  const todo = await removeFromDB(todoId)

  if (!todo) {
    exitNotFound()
  }

  printTodo(todo)
}

export default remove
