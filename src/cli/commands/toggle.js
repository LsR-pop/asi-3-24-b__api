import toggleFromDB from "../../db/toggle.js"
import { exitNotFound } from "../utils/exitWithError.js"
import printTodo from "../utils/printTodo.js"

const toggle = async (todoId) => {
  const updatedTodo = await toggleFromDB(todoId)

  if (!updatedTodo) {
    exitNotFound()
  }

  printTodo(updatedTodo)
}

export default toggle
