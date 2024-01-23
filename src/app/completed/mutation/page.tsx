"use client"
import { TodoList } from "@/app/_components/TodoList"
import { Todo, api } from "@/app/_mockAPI/api"
import { queryKeyFactory } from "@/app/_queries/queryKeyFactory"
import { Spinner } from "@nextui-org/react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export default function Mutation() {
  const { data, isPending } = useQuery(queryKeyFactory.todo.list({}))
  const queryClient = useQueryClient()
  const mutation = useMutation<
    Todo | null,
    unknown,
    { id: number; isComplete: boolean }
  >({
    mutationFn: (variables) =>
      api.updateTodo(variables.id, variables.isComplete),
    onSuccess: (newTodo) => {
      const previousData: Todo[] = queryClient.getQueryData(
        queryKeyFactory.todo.list({}).queryKey
      ) as Todo[]

      queryClient.setQueryData(
        queryKeyFactory.todo.list({}).queryKey,
        previousData.map((todo) => (todo.id === newTodo?.id ? newTodo : todo))
      )
    },
  })

  return (
    <div className="flex justify-center flex-col items-center mb-4">
      <h1 className="text-3xl font-bold mb-4">How to become a dev</h1>
      {isPending || mutation.isPending ? (
        <Spinner color="primary" />
      ) : (
        <TodoList
          isReadOnly={false}
          todos={data ?? []}
          onChecked={(id, isComplete) => mutation.mutate({ id, isComplete })}
        />
      )}
    </div>
  )
}
