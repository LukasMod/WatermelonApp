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

export const addTask = async ({ newTaskName }) => {
  const tasksCollection = database.collections.get("tasks")
  console.log("add task")
  await database.write(async () => {
    await tasksCollection.create((task) => {
      task.name = newTaskName
      task.completed = false
    })
  })
}

export const changeTaskName = async (item, newName) => {
  const tasksCollection = database.collections.get("tasks")
  const taskToUpdate = await tasksCollection.find(item.id)

  await database.write(async () => {
    await taskToUpdate.update((task) => {
      task.name = newName
    })
  })
}

export const changeTaskCompleted = async (item) => {
  const tasksCollection = database.collections.get("tasks")
  const taskToUpdate = await tasksCollection.find(item.id)

  await database.write(async () => {
    await taskToUpdate.update((task) => {
      task.completed = !task.completed
    })
  })
}
export const removeTaskFromDatabase = async (item) => {
  const tasksCollection = database.collections.get("tasks")
  const taskToUpdate = await tasksCollection.find(item.id)

  await database.write(async () => {
    await taskToUpdate.destroyPermanently()
  })
}
