import read from "./read.js"
import write from "./write.js"

const remove = async (todoId) => {
  const db = await read()
  const { [todoId]: todo } = db.todos

  if (!todo) {
    return null
  }

  await write(db, {
    todos: {
      [todoId]: undefined,
    },
  })

  return todo
}

export default remove
