import { Database } from "@nozbe/watermelondb"
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite"

import Weight from "./weight"
import schema from "./schema"
import migrations from "./migrations"
import Post from "./post"
import Task from "./task"

const adapter = new SQLiteAdapter({
  schema,
  // migrations,
  jsi: true,
  //   onSetUpError: (error) => console.log(error),
})

export const database = new Database({
  adapter,
  modelClasses: [Weight, Post, Task],
})
