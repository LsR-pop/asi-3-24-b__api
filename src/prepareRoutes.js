import preparePostsRoutes from "./routes/preparePostsRoutes.js"
import prepareSignRoutes from "./routes/prepareSignRoutes.js"
import prepareCommentsRoutes from "./routes/prepareCommentsRoutes.js"

const prepareRoutes = (ctx) => {
  prepareSignRoutes(ctx)
  preparePostsRoutes(ctx)
  prepareCommentsRoutes(ctx)
}

export default prepareRoutes
