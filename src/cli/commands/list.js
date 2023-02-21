import listFromDB from "../../db/list.js"
import printTodo from "../utils/printTodo.js"

const list = ({ all }) => listFromDB({ all }).forEach(printTodo)

export default list
