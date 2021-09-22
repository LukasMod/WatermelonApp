import { Model } from "@nozbe/watermelondb"
import field from "@nozbe/watermelondb/decorators/field"
import relation from "@nozbe/watermelondb/decorators/relation"

export default class Comment extends Model {
  static table = "comments"
  static associations = {
    posts: { type: "belongs_to", key: "post_id" },
  } as const

  @field("body") body

  @field("is_nasty") isNasty

  @relation("posts", "post_id") post
}
