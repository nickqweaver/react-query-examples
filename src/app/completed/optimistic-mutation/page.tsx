"use client"
import { Spinner } from "@nextui-org/react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { TodoList } from "../../_components/TodoList"
import { Todo, api } from "../../_mockAPI/api"
import { queryKeyFactory } from "@/app/_queries/queryKeyFactory"

export default function OptimisticMutation() {
  const { data, isPending } = useQuery(queryKeyFactory.todo.list({}))
  const queryClient = useQueryClient()
  const mutation = useMutation<
    Todo | null,
    unknown,
    { id: number; isComplete: boolean }
  >({
    mutationFn: (variables) =>
      api.updateTodo(variables.id, variables.isComplete),
    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({
        queryKey: queryKeyFactory.todo.list({}).queryKey,
      })

      // Snapshot the previous value
      const previousData: Todo[] = queryClient.getQueryData(
        queryKeyFactory.todo.list({}).queryKey
      ) as Todo[]

      // Optimistically update to the new value
      queryClient.setQueryData<Todo[]>(
        queryKeyFactory.todo.list({}).queryKey,
        (old) => {
          if (!old) return []
          return old.map((todo) =>
            todo.id === newTodo.id
              ? { ...todo, isComplete: newTodo.isComplete }
              : todo
          )
        }
      )

      return { previousData }
    },
    onError: (err, newTodo, context: { previousData: Todo[] }) => {
      queryClient.setQueryData(
        queryKeyFactory.todo.list({}).queryKey,
        context.previousData
      )
    },
  })

  return (
    <div className="flex justify-center flex-col items-center mb-4">
      <h1 className="text-3xl font-bold mb-4">How to become a dev</h1>
      {isPending ? (
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
