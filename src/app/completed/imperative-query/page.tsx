"use client"
import { Spinner } from "@nextui-org/react"
import { useState, useEffect } from "react"
import { TodoList } from "../../_components/TodoList"
import { api, Todo } from "../../_mockAPI/api"

export default function ImperativeQuery() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [data, setData] = useState<Todo[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)
        const todos = await api.getTodos()
        setData(todos)
      } catch (err) {
        if (err instanceof Error) setError(err.message)
        setError("Could not retrieve TODOS")
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return (
    <div className="flex flex-col gap-3 px-4 py-4">
      <h1 className="text-3xl font-bold">How to Become a Dev (Imperative)</h1>
      <p>Fetching imperatively</p>
      {isLoading ? (
        <div className="flex flex-col">
          Loading your TODOS
          <Spinner />
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <TodoList todos={data} isReadOnly />
      )}
    </div>
  )
}
