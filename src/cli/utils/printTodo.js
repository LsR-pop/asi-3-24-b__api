const printTodo = ({ id, description, done }) => {
  console.log(`[${done ? "X" : " "}] #${id} ${description}`)
}

export default printTodo
