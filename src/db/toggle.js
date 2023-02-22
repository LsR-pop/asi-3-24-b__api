import read from "./read.js"
import write from "./write.js"

const toggle = async (todoId) => {
  const db = await read()
  const { [todoId]: todo } = db.todos

  if (!todo) {
    return null
  }

  const updatedTodo = {
    ...todo,
    done: !todo.done,
  }

  await write(db, {
    todos: {
      [todoId]: updatedTodo,
    },
  })

  return updatedTodo
}

export default toggle
