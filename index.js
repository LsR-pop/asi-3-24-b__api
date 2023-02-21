import { Command } from "commander"
import add from "./src/commands/add.js"
import list from "./src/commands/list.js"
import remove from "./src/commands/remove.js"
import toggle from "./src/commands/toggle.js"
import parseTodoId from "./src/utils/parseTodoId.js"

const program = new Command()

program.name("todo")

program
  .command("add")
  .alias("a")
  .description("add a new todo")
  .argument("<description>", "description")
  .action(add)

program
  .command("list")
  .aliases(["ls", "l"])
  .description("list all todos (default: only not done)")
  .option("-a, --all", "show all todos including done")
  .action(list)

program
  .command("remove")
  .alias("rm")
  .description("remove a todo")
  .argument("<todoId>", "Todo ID", parseTodoId)
  .action(remove)

program
  .command("toggle")
  .alias("x")
  .description("toggle `done` state of a todo")
  .argument("<todoId>", "Todo ID", parseTodoId)
  .action(toggle)

program.parse()
