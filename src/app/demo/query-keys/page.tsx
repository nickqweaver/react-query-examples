"use client"
import { Spinner, Switch } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { TodoList } from "../../_components/TodoList"
import { api } from "../../_mockAPI/api"
import { queryKeyFactory } from "@/app/_queries/queryKeyFactory"

const CompletedTodos = () => {
  const { data, isPending } = useQuery(
    queryKeyFactory.todo.list({ isComplete: true })
  )

  if (isPending)
    return (
      <div className="flex flex-col gap-2">
        <Spinner /> Loading Todos..
      </div>
    )

  return data ? <TodoList isReadOnly todos={data} /> : <div>No Todos</div>
}

const IncompleteTodos = () => {
  const { data, isPending } = useQuery(
    queryKeyFactory.todo.list({ isComplete: false })
  )

  if (isPending)
    return (
      <div className="flex flex-col gap-2">
        <Spinner /> Loading Todos..
      </div>
    )

  return data ? <TodoList isReadOnly todos={data} /> : <div>No Todos</div>
}

/**
 *
 * This Parent Component does the initial fetching of data, a flawed implementation waits for the data
 * to be available before it renders some of the children that are relying on the same data.
 *
 * These Children have entered the incorrect Cache Keys, therefore ends up requesting the Same data from the server twice.
 * The getTodos function has a setTimeout of 2000 ms, but because of this flawed implementation and the mismatch of QueryKeys
 * the initial load takes twice as long (4000ms).
 *
 * 1. Show the increase in page load time
 * 2. Look at the lack of Type inference for Query Keys inside Completed Todos & Incomplete Todos
 * 3. Look at the Cache Devtools to see duplicate Entries
 * 4. Refactor to Utilize a Query Key Factory
 * 5. Showcase the Singular Cache entry, and Quicker response time
 */
export default function QueryKeys() {
  const [isToggled, setIsToggled] = useState(false)
  const [timer, setTimer] = useState(0)
  const { data } = useQuery(
    queryKeyFactory.todo.list({ isComplete: isToggled })
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1)
    }, 1000)

    setTimeout(() => {
      clearInterval(interval)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <div className="flex gap-8 mb-6">
        <div className="flex justify-center gap-2">
          <Switch isSelected={isToggled} onValueChange={setIsToggled} />
          <span>{isToggled ? "Showing Completed" : "Showing Incomplete"}</span>
        </div>
        <div>Time since Mount: {timer} </div>
      </div>

      <h1 className="text-3xl font-bold mb-4">How to become a Dev</h1>
      {data ? (
        isToggled ? (
          <CompletedTodos />
        ) : (
          <IncompleteTodos />
        )
      ) : (
        <div>I havent Started</div>
      )}
    </div>
  )
}
