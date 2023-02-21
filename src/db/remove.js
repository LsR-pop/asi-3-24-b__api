import read from "../utils/read.js"
import write from "../utils/write.js"

const remove = (todoId) => {
  const db = read()
  const { [todoId]: todo } = db.todos

  if (!todo) {
    return null
  }

  write(db, {
    todos: {
      [todoId]: undefined,
    },
  })

  return todo
}

export default remove
