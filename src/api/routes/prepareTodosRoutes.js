import add from "../../db/add.js"
import list from "../../db/list.js"
import parseTodoId from "../../db/parseTodoId.js"
import read from "../../db/read.js"

const prepareTodosRoutes = (app) => {
  // CREATE
  app.post("/todos", (req, res) => {
    const { description } = req.body

    const todo = add(description)

    res.send(todo)
  })

  // READ collection
  app.get("/todos", (req, res) => {
    const all = Boolean(req.query.all)
    const todos = list({ all })

    res.send(todos)
  })

  // READ single
  app.get("/todos/:todoId", (req, res) => {
    const todoId = parseTodoId(req.params.todoId)
    const {
      todos: { [todoId]: todo },
    } = read()

    if (!todo) {
      res.status(404).send({ error: "Not found" })

      return
    }

    res.send({ result: todo })
  })

  // // UPDATE full
  // app.put("/todos/:todoId")
  // // UPDATE partial
  // app.patch("/todos/:todoId")
  // // DELETE
  // app.delete("/todos/:todoId")
}

export default prepareTodosRoutes
