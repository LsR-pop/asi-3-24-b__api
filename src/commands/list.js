import printTodo from "../utils/printTodo.js"
import read from "../utils/read.js"

const list = () => {
  const { todos } = read()

  Object.values(todos).forEach(printTodo)
}

export default list
