import validate from "../middlewares/validate.js"
import {
  boolValidator,
  contentValidator,
  idValidator,
  limitValidator,
  orderFieldValidator,
  orderValidator,
  pageValidator,
  titleValidator,
} from "../validators.js"

const preparePostsRoutes = ({ app, db }) => {
  app.post(
    "/posts",
    validate({
      body: {
        title: titleValidator.required(),
        content: contentValidator.required(),
        userId: idValidator.required(),
      },
    }),
    async (req, res) => {
      const { title, content, userId } = req.locals.body
      const [post] = await db("posts")
        .insert({
          title,
          content,
          userId,
        })
        .returning("*")

      res.send(post)
    }
  )

  app.get(
    "/posts",
    validate({
      query: {
        limit: limitValidator,
        page: pageValidator,
        orderField: orderFieldValidator(["title", "content"]).default("title"),
        order: orderValidator.default("desc"),
        isPublished: boolValidator.default(true),
      },
    }),
    async (req, res) => {
      const { limit, page, orderField, order, isPublished } = req.locals.query
      const query = db("posts")
        .select("posts.*", "users.displayName")
        .innerJoin("users", "users.id", "=", "posts.userId")
        .limit(limit)
        .offset((page - 1) * limit)

      if (isPublished) {
        query.whereNotNull("publishedAt")
      }

      if (orderField) {
        query.orderBy(orderField, order)
      }

      const posts = await query

      res.send(posts)
    }
  )

  app.get(
    "/posts/:postId",
    validate({
      params: {
        postId: idValidator.required(),
      },
    }),
    async (req, res) => {
      const [post] = await db("posts").where({ id: req.params.postId })

      if (!post) {
        res.status(404).send({ error: "not found" })

        return
      }

      res.send(post)
    }
  )

  app.patch("/posts/:postId", async (req, res) => {
    const { title, content, published } = req.body
    const [post] = await db("posts").where({ id: req.params.postId })

    if (!post) {
      res.status(404).send({ error: "not found" })

      return
    }

    const [updatedPost] = await db("posts")
      .update({
        ...(title ? { title } : {}),
        ...(content ? { content } : {}),
        ...(published ? { published } : {}),
      })
      .where({
        id: req.params.postId,
      })
      .returning("*")

    res.send(updatedPost)
  })

  app.delete("/posts/:postId", async (req, res) => {
    const [post] = await db("posts").where({ id: req.params.postId })

    if (!post) {
      res.status(404).send({ error: "not found" })

      return
    }

    await db("posts").delete().where({
      id: req.params.postId,
    })

    res.send(post)
  })
}

export default preparePostsRoutes
