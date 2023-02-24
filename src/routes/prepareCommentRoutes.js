import CommentModel from "../db/models/CommentModel.js"
import auth from "../middlewares/auth.js"
import validate from "../middlewares/validate.js"
import {
  boolValidator,
  contentValidator,
  idValidator,
  limitValidator,
  orderFieldValidator,
  orderValidator,
  pageValidator,
} from "../validators.js"

const prepareCommentsRoutes = ({ app }) => {
  app.post(
    "/comments",
    auth,
    validate({
      body: {
        content: contentValidator.required(),
      },
    }),
    async (req, res) => {
      const {
        body: { content },
        session: {
          user: { id: userId },
        },
      } = req.locals
      const comment = await CommentModel.query()
        .insert({
          content,
          userId,
        })
        .returning("*")

      res.send({ result: comment })
    }
  )

  app.get(
    "/comments",
    validate({
      query: {
        limit: limitValidator,
        page: pageValidator,
        orderField: orderFieldValidator(["content"]).default("content"),
        order: orderValidator.default("desc"),
        isPublished: boolValidator.default(true),
      },
    }),
    async (req, res) => {
      const { limit, page, orderField, order, isPublished } = req.locals.query
      const query = CommentModel.query().modify("paginate", limit, page)

      if (isPublished) {
        query.whereNotNull("publishedAt")
      }

      if (orderField) {
        query.orderBy(orderField, order)
      }

      const [countResult] = await query
        .clone()
        .clearSelect()
        .clearOrder()
        .count()
      const count = Number.parseInt(countResult.count, 10)
      const comments = await query.withGraphFetched("comments")

      res.send({
        result: comments,
        meta: {
          count,
        },
      })
    }
  )

  app.get(
    "/comments/:commentId",
    validate({
      params: {
        commentId: idValidator.required(),
      },
    }),
    async (req, res) => {
      const comment = await CommentModel.query().findById(req.params.commentId)

      if (!comment) {
        res.status(404).send({ error: "Comment not found" })

        return
      }

      res.send({ result: comment })
    }
  )

  app.patch("/comments/:commentId", async (req, res) => {
    const { content, updatedAt } = req.body
    const comment = await CommentModel.query().findById(req.params.commentId)

    if (!comment) {
      res.status(404).send({ error: "Comment not found" })

      return
    }

    const updatedComment = await CommentModel.query()
      .update({
        ...(content ? { content } : {}),
        ...(updatedAt ? { updatedAt } : {}),
      })
      .where({
        id: req.params.commentId,
      })
      .returning("*")

    res.send({ result: updatedComment })
  })

  app.delete("/comments/:commentId", async (req, res) => {
    const comment = await CommentModel.query().findById(req.params.commentId)

    if (!comment) {
      res.status(404).send({ error: "Comment not found" })

      return
    }

    await CommentModel.query().delete().where({
      id: req.params.commentId,
    })

    res.send({ result: comment })
  })
}

export default prepareCommentsRoutes