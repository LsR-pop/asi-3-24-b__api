import process from "node:process"
import add from "./src/commands/add.js"
import list from "./src/commands/list.js"
import remove from "./src/commands/remove.js"
import toggle from "./src/commands/toggle.js"
import { exitInvalidCommand } from "./src/utils/exitWithError.js"

const [commandName, ...args] = process.argv.slice(2)
const commands = {
  add,
  list,
  remove,
  toggle,
}
const command = commands[commandName]

if (!command) {
  exitInvalidCommand()
}

command(args)
