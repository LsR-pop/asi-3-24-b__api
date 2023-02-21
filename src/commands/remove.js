import { exitNotFound } from "../utils/exitWithError.js"
import printTodo from "../utils/printTodo.js"
import read from "../utils/read.js"
import write from "../utils/write.js"

const remove = ([todoId]) => {
  const db = read()
  const { [todoId]: todo, ...todos } = db.todos

  if (!todo) {
    exitNotFound()
  }

  write({
    ...db,
    todos,
  })

  printTodo(todo)
}

export default remove
