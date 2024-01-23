"use client"
import { TodoList } from "@/app/_components/TodoList"
import { Spinner } from "@nextui-org/react"
import { Loading } from "../../_components/Loading"
import { Error } from "../../_components/Error"
import { api, Todo } from "@/app/_mockAPI/api"
import { useEffect, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"

/**
 * 1. Showcase the Mock API
 * 2. How do we fetch data natively in React without using any other libs? Write this implementation out
 * 3. Show the UI Working
 * 4. Refactor to use React Query (Declarative Paradigm)
 * 5. View the Devtools with the Cached Data
 */
export default function ImperativeToDeclarative() {
  const { isPending, error, data } = useQuery({
    queryKey: ["todos"],
    queryFn: () => api.getTodos(),
  })

  return (
    <div className="flex flex-col gap-3 px-4 py-4">
      <h1 className="text-3xl font-bold">How to Become a Dev (Imperative)</h1>
      <p>Fetching imperatively</p>
      {isPending ? (
        <Loading />
      ) : error ? (
        <Error error={error.message} />
      ) : (
        <TodoList todos={data} isReadOnly />
      )}
    </div>
  )
}
