const parseTodoId = (id) => {
  const todoId = Number.parseInt(id, 10)

  if (Number.isNaN(todoId)) {
    throw new Error("Invalid todo ID")
  }

  return todoId
}

export default parseTodoId
