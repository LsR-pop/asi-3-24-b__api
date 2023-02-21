import read from "../db/read.js"

const identity = (x) => x
const checkNotDone = ({ done }) => !done

const list = ({ all }) => {
  const { todos } = read()

  return Object.values(todos).filter(all ? identity : checkNotDone)
  // .forEach(printTodo)
}

export default list
