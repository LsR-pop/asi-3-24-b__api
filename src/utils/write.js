import { writeFileSync } from "node:fs"
import config from "../config.js"

const write = (db) => {
  writeFileSync(config.db.path, JSON.stringify(db), { encoding: "utf-8" })
}

export default write
