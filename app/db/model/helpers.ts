import { database } from "./database"

export type Weight = {
  createdAt?: Date
  weight: string | number
  note: string | undefined
}
export type Post = {
  title: string
  body: string
}

const weights = database.collections.get("weights")

export const observeWeights = () => weights.query().observe()
export const saveWeight = async ({ weight, note }: Weight) => {
  await database.write(async () => {
    await weights.create((entry) => {
      entry.weight = Number(weight)
      entry.note = note
    })
  })
}

const posts = database.collections.get("posts")

export const observePosts = () => posts.query().observe()
export const addPost = async ({ title, body }: Post) => {
  await database.write(async () => {
    await posts.create((entry) => {
      entry.title = title
      entry.body = body
    })
  })
}
