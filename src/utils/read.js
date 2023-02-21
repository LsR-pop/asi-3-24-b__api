import { readFileSync } from "node:fs"
import config from "../config.js"

const read = () => {
  try {
    const data = readFileSync(config.db.path, { encoding: "utf-8" })

    return JSON.parse(data)
  } catch (err) {
    return {
      lastId: 0,
      todos: {},
    }
  }
}

export default read
