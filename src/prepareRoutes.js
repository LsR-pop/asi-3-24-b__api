import preparePostsRoutes from "./routes/preparePostsRoutes.js"

const prepareRoutes = (ctx) => {
  // prepareSignRoutes(ctx)
  preparePostsRoutes(ctx)
}

export default prepareRoutes
