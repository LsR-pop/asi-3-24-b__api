const preparePostsRoutes = ({ app, db }) => {
  app.post("/posts", async (req, res) => {
    const { title, content, userId } = req.body
    const [post] = await db("posts")
      .insert({
        title,
        content,
        userId,
      })
      .returning("*")

    res.send(post)
  })

  app.get("/posts", async (req, res) => {
    const posts = await db("posts")

    res.send(posts)
  })

  app.get("/posts/:postId", async (req, res) => {
    const [post] = await db("posts").where({ id: req.params.postId })

    if (!post) {
      res.status(404).send({ error: "not found" })

      return
    }

    res.send(post)
  })

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
