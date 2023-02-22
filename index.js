import express from "express"
import knex from "knex"
import config from "./src/config.js"
import prepareRoutes from "./src/prepareRoutes.js"

const db = knex(config.db)
const app = express()

app.use(express.json())

prepareRoutes({ app, db })

app.listen(config.port, () => console.log(`Listening on :${config.port}`))
