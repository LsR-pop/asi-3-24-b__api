import BaseModel from "./BaseModel.js"
import UserModel from "./UserModel.js"
import CommentModel from "./CommentModel.js"

class PostModel extends BaseModel {
  static tableName = "posts"

  static modifiers = {
    paginate: (query, limit, page) => {
      return query.limit(limit).offset((page - 1) * limit)
    },
  }

  static relationMappings() {
    return {
      author: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "posts.userId",
          to: "users.id",
        },
        modify: (query) => query.select("id", "displayName"),
      },
      comments: {
        relation: BaseModel.HasManyRelation,
        modelClass: CommentModel,
        join: {
          from: "users.id",
          to: "comments.userId",
        },
        modify: (query) => query.select("id", "displayName"),
      },
    }
  }
}

export default PostModel
