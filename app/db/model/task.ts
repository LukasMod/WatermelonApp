import { Model } from "@nozbe/watermelondb"
import { field } from "@nozbe/watermelondb/decorators"

export default class Task extends Model {
  static table = "tasks"

  @field("name") name
  @field("completed") completed
}
