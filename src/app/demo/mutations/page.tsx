"use client"
import { TodoList } from "@/app/_components/TodoList"
import { Todo, api } from "@/app/_mockAPI/api"
import { queryKeyFactory } from "@/app/_queries/queryKeyFactory"
import { Spinner } from "@nextui-org/react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

/**
 * This component fetched the results initially and then allows mutations to check/uncheck the TODO's
 *
 * 1. Pass the updateTodos to mutationFn
 * 2. Pass the onSuccess method and manually write the cache
 * 3. Show the UI with lag times between each check/uncheck of a TODO
 * 3. Refactor onSuccess to run optimistically
 * 4. Show case lack of lag time between UI events
 * 5. Change the updateTodo mutationFn to run updateTodoFailure to showcase the RollBack when Error Occurs
 */

type Mutation = {}
export default function Mutation() {
  const { data, isPending } = useQuery(queryKeyFactory.todo.list({}))
  const queryClient = useQueryClient()

  const mutation = useMutation<
    Todo | null,
    unknown,
    { id: number; isComplete: boolean }
  >({
    mutationFn: (variables) =>
      api.updateTodoFailure(variables.id, variables.isComplete),
    onMutate: async (newTodoVariables) => {
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
            todo.id === newTodoVariables.id
              ? { ...todo, ...newTodoVariables }
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
    onSettled: () => {
      if ___typename === 'error' 
      
    }
  })

  const sourceCode = async (onSuccess: () => void, onError: () => void, onSetted: () => void, onMutate: () => void, variables: {}) => {
    onMutate(variables)
    const results = await mutateFn(variables)

    if (results.status === 200) onSuccess(results)
    if (results.status === 400) onError(results)

    onSetted(results)

  }

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
