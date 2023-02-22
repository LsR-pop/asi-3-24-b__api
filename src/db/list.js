import read from "./read.js"

const identity = (x) => x
const checkNotDone = ({ done }) => !done

const list = async ({ all } = {}) => {
  const { todos } = await read()

  return Object.values(todos).filter(all ? identity : checkNotDone)
}

export default list
