import { readFileSync, writeFileSync } from "node:fs"
import process from "node:process"

const DB_PATH = "./db.json"
const [commandName, ...args] = process.argv.slice(2)

const read = () => {
  try {
    const data = readFileSync(DB_PATH, { encoding: "utf-8" })

    return JSON.parse(data)
  } catch (err) {
    return {
      lastId: 0,
      todos: {},
    }
  }
}

const write = (db) => {
  writeFileSync(DB_PATH, JSON.stringify(db), { encoding: "utf-8" })
}

const printTodo = ({ id, description, done }) => {
  console.log(`[${done ? "X" : " "}] #${id} ${description}`)
}

const commands = {
  add: ([description]) => {
    const db = read()
    const lastId = db.lastId + 1
    const todo = {
      id: lastId,
      description,
      done: false,
    }
    const todos = {
      ...db.todos,
      [lastId]: todo,
    }

    write({
      lastId,
      todos,
    })

    printTodo(todo)
  },
  list: () => {
    const { todos } = read()

    Object.values(todos).forEach(printTodo)
  },
  remove: ([todoId]) => {
    const db = read()
    const { [todoId]: todo, ...todos } = db.todos

    if (!todo) {
      console.error("No such todo.")

      process.exit(3)
    }

    write({
      ...db,
      todos,
    })

    printTodo(todo)
  },
  toggle: ([todoId]) => {
    const db = read()
    const { [todoId]: todo, ...todos } = db.todos

    if (!todo) {
      console.error("No such todo.")

      process.exit(3)
    }

    const updatedTodo = {
      ...todo,
      done: !todo.done,
    }

    write({
      ...db,
      todos: {
        ...todos,
        [todoId]: updatedTodo,
      },
    })

    printTodo(updatedTodo)
  },
}

const command = commands[commandName]

if (!command) {
  console.error("Invalid command")

  process.exit(1)
}

command(args)
