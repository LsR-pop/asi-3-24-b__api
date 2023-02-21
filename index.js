import { Command } from "commander"
import add from "./src/cli/commands/add.js"
import list from "./src/cli/commands/list.js"
import remove from "./src/cli/commands/remove.js"
import toggle from "./src/cli/commands/toggle.js"
import parseTodoId from "./src/utils/parseTodoId.js"

const program = new Command()

program.name("todo")

program
  .command("add")
  .alias("a")
  .description("add a new todo")
  .argument("<description>", "description", (x) => x.trim())
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
