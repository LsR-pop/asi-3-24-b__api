import express from "express"
import knex from "knex"
import morgan from "morgan"
import config from "./src/config.js"
import prepareRoutes from "./src/prepareRoutes.js"

const db = knex(config.db)
const app = express()

app.use(express.json())
app.use(morgan(config.logger.format))

prepareRoutes({ app, db })

app.listen(config.port, () => console.log(`Listening on :${config.port}`))
