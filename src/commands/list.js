import printTodo from "../utils/printTodo.js"
import read from "../utils/read.js"

const identity = (x) => x
const checkNotDone = ({ done }) => !done

const list = ({ all }) => {
  const { todos } = read()

  Object.values(todos)
    .filter(all ? identity : checkNotDone)
    .forEach(printTodo)
}

export default list
