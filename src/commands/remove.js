import { exitNotFound } from "../utils/exitWithError.js"
import printTodo from "../utils/printTodo.js"
import read from "../utils/read.js"
import write from "../utils/write.js"

const remove = ([todoId]) => {
  const db = read()
  const { [todoId]: todo } = db.todos

  if (!todo) {
    exitNotFound()
  }

  write(db, {
    todos: {
      [todoId]: undefined,
    },
  })

  printTodo(todo)
}

export default remove
