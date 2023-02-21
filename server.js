import express from "express"
import prepareTodosRoutes from "./src/api/routes/prepareTodosRoutes.js"

const app = express()

app.use(express.json())

prepareTodosRoutes(app)

app.listen(3000, () => console.log("Listening on :3000"))
