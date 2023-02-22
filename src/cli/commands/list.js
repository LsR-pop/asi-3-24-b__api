import listFromDB from "../../db/list.js"
import printTodo from "../utils/printTodo.js"

const list = async ({ all }) => (await listFromDB({ all })).forEach(printTodo)

export default list
