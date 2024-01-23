"use client"
import { Spinner, Switch } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { TodoList } from "../../_components/TodoList"
import { queryKeyFactory } from "@/app/_queries/queryKeyFactory"

const CompletedQueries = () => {
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

const IncompleteQueries = () => {
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

export default function QueryKeyFactory() {
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

    return () => {
      clearInterval(interval)
    }
  }, [data])

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
          <CompletedQueries />
        ) : (
          <IncompleteQueries />
        )
      ) : (
        <div>I havent Started</div>
      )}
    </div>
  )
}
