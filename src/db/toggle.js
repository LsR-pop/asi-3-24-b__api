import read from "../utils/read.js"
import write from "../utils/write.js"

const toggle = (todoId) => {
  const db = read()
  const { [todoId]: todo } = db.todos

  if (!todo) {
    return null
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

  return updatedTodo
}

export default toggle
