import printTodo from "../utils/printTodo.js"
import read from "../utils/read.js"
import write from "../utils/write.js"

const add = ([description]) => {
  const db = read()
  const lastId = db.lastId + 1
  const todo = {
    id: lastId,
    description,
    done: false,
  }
  const todos = {
    ...db.todos,
    [lastId]: todo,
  }

  write({
    lastId,
    todos,
  })

  printTodo(todo)
}

export default add
