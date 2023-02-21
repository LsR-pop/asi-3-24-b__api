import read from "./read.js"
import write from "./write.js"

const add = (description) => {
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

  return todo
}

export default add
