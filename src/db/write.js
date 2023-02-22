import { deepmerge } from "deepmerge-ts"
import { writeFile } from "node:fs/promises"
import config from "../config.js"

const write = async (db, patch) => {
  await writeFile(config.db.path, JSON.stringify(deepmerge(db, patch)), {
    encoding: "utf-8",
  })
}

export default write
