import add from "../../db/add.js"
import list from "../../db/list.js"
import parseTodoId from "../../db/parseTodoId.js"
import read from "../../db/read.js"
import remove from "../../db/remove.js"
import write from "../../db/write.js"

const prepareTodosRoutes = (app) => {
  // CREATE
  app.post("/todos", async (req, res) => {
    const { description } = req.body

    const todo = await add(description)

    res.send(todo)
  })

  // READ collection
  app.get("/todos", async (req, res) => {
    const all = Boolean(req.query.all)
    const todos = await list({ all })

    res.send(todos)
  })

  // READ single
  app.get("/todos/:todoId", async (req, res) => {
    const todoId = parseTodoId(req.params.todoId)
    const {
      todos: { [todoId]: todo },
    } = await read()

    if (!todo) {
      res.status(404).send({ error: "Not found" })

      return
    }

    res.send({ result: todo })
  })

  // UPDATE full
  app.put("/todos/:todoId", async (req, res) => {
    const todoId = parseTodoId(req.params.todoId)
    const { description, done } = req.body
    const db = await read()
    const {
      todos: { [todoId]: todo },
    } = db

    if (!todo) {
      res.status(404).send({ error: "Not found" })

      return
    }

    await write(db, {
      todos: {
        [todoId]: {
          description,
          done,
        },
      },
    })
  })
  // UPDATE partial
  app.patch("/todos/:todoId", async (req, res) => {
    const todoId = parseTodoId(req.params.todoId)
    const { description, done } = req.body
    const db = await read()
    const {
      todos: { [todoId]: todo },
    } = db

    if (!todo) {
      res.status(404).send({ error: "Not found" })

      return
    }

    const updatedTodo = {
      ...todo,
      description: description ?? todo.description,
      done: done ?? todo.done,
    }

    await write(db, {
      todos: {
        [todoId]: updatedTodo,
      },
    })

    res.send(updatedTodo)
  })
  // DELETE
  app.delete("/todos/:todoId", async (req, res) => {
    const todoId = parseTodoId(req.params.todoId)
    const todo = await remove(todoId)

    if (!todo) {
      res.status(404).send({ error: "Not found" })

      return
    }

    res.send(todo)
  })
}

export default prepareTodosRoutes
