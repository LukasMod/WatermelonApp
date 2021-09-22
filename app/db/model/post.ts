import { Model } from "@nozbe/watermelondb"
import { children } from "@nozbe/watermelondb/decorators"
import field from "@nozbe/watermelondb/decorators/field"
import text from "@nozbe/watermelondb/decorators/text"

export default class Post extends Model {
  static table = "posts"
  static associations = {
    comments: { type: "has_many", foreignKey: "post_id" },
  } as const

  @text("title") title
  @text("body") body
  @field("is_pinned") isPinned
  @children("comments") comments
}
