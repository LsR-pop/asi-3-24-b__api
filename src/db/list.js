import read from "./read.js"

const identity = (x) => x
const checkNotDone = ({ done }) => !done

const list = ({ all } = {}) => {
  const { todos } = read()

  return Object.values(todos).filter(all ? identity : checkNotDone)
}

export default list
