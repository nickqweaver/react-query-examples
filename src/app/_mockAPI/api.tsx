export type Todo = {
  id: number
  title: string
  isComplete: boolean
}
type DB = {
  todos: Todo[]
}

const db: DB = {
  todos: [
    {
      id: 1,
      title: "Learn JS",
      isComplete: false,
    },
    {
      id: 2,
      title: "Learn React",
      isComplete: true,
    },
    {
      id: 3,
      title: "Learn Tanstack Query",
      isComplete: false,
    },
    {
      id: 4,
      title: "Learn GraphQL",
      isComplete: true,
    },
    {
      id: 5,
      title: "Learn Python",
      isComplete: false,
    },
  ],
}

const wait = async (ms: number) =>
  await new Promise((resolve) => setTimeout(resolve, ms))

export const api = {
  getTodos: async (filter?: "complete" | "incomplete") => {
    await wait(2000)

    if (filter === "complete") return db.todos.filter((todo) => todo.isComplete)

    if (filter === "incomplete")
      return db.todos.filter((todo) => !todo.isComplete)

    return db.todos
  },
  getTodo: async (id: number) => {
    await wait(2000)
    return db.todos.find((todo) => todo.id === id)
  },
  updateTodo: async (id: number, isComplete: boolean): Promise<Todo | null> => {
    await wait(3000)

    const found = db.todos.find((todo) => todo.id === id)

    if (found) return { ...found, isComplete }
    return null
  },
  updateTodoFailure: async (
    id: number,
    isComplete: boolean
  ): Promise<Todo | null> => {
    await wait(3000)
    throw new Error("Could not update your todo!")
  },
}
