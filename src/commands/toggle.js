import { exitNotFound } from "../utils/exitWithError.js"
import printTodo from "../utils/printTodo.js"
import read from "../utils/read.js"
import write from "../utils/write.js"

const toggle = (todoId) => {
  const db = read()
  const { [todoId]: todo } = db.todos

  if (!todo) {
    exitNotFound()
  }

  const updatedTodo = {
    ...todo,
    done: !todo.done,
  }

  write(db, {
    todos: {
      [todoId]: updatedTodo,
    },
  })

  printTodo(updatedTodo)
}

export default toggle
