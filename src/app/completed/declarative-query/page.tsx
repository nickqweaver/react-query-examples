"use client"
import { Spinner } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { TodoList } from "../../_components/TodoList"
import { api } from "../../_mockAPI/api"

export default function DeclarativeQuery() {
  // Declare the data you want to fetch!
  const { data, isPending, error } = useQuery({
    queryKey: ["todo", "list"],
    queryFn: () => api.getTodos(),
  })

  if (isPending)
    return (
      <div className="flex flex-col gap-2">
        Loading your Todos...
        <Spinner />;
      </div>
    )

  if (error || !data) return <p>{error?.message ?? "There was a problem"}</p>

  return (
    <div>
      <h1 className="text-3xl font-bold">How to Become a Dev (Declarative)</h1>
      <p>Fetching Declaratively</p>
      <TodoList todos={data} isReadOnly />;
    </div>
  )
}
