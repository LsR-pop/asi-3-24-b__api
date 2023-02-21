import { deepmerge } from "deepmerge-ts"
import { writeFileSync } from "node:fs"
import config from "../config.js"

const write = (db, patch) => {
  writeFileSync(config.db.path, JSON.stringify(deepmerge(db, patch)), {
    encoding: "utf-8",
  })
}

export default write
