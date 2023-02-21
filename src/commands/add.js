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

  write(db, {
    lastId,
    todos: {
      [lastId]: todo,
    },
  })

  printTodo(todo)
}

export default add
