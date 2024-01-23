"use client"
import { Spinner, Switch } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { TodoList } from "../../_components/TodoList"
import { api } from "../../_mockAPI/api"

const SHOULD_USE_CORRECT_KEY = false

const CompletedQueries = () => {
  const incorrectQueryKey = ["todos", "list", "completed"]
  const correctQueryKey = ["todos", "list", { filters: { isComplete: true } }]

  const { data, isPending } = useQuery({
    // Oh no, no type inference so I am just guessing the key
    queryKey: SHOULD_USE_CORRECT_KEY ? correctQueryKey : incorrectQueryKey,
    queryFn: () => api.getTodos("complete"),
  })

  if (isPending)
    return (
      <div className="flex flex-col gap-2">
        <Spinner /> Loading Todos..
      </div>
    )

  return data ? <TodoList isReadOnly todos={data} /> : <div>No Todos</div>
}

const IncompleteQueries = () => {
  const incorrectQueryKey = ["todos", "list", "incomplete"]
  const correctQueryKey = ["todos", "list", { filters: { isComplete: false } }]
  const { data, isPending } = useQuery({
    // Oh no, no type inference so I am just guessing the key
    queryKey: SHOULD_USE_CORRECT_KEY ? correctQueryKey : incorrectQueryKey,
    queryFn: () => api.getTodos("incomplete"),
  })

  if (isPending)
    return (
      <div className="flex flex-col gap-2">
        <Spinner /> Loading Todos..
      </div>
    )

  return data ? <TodoList isReadOnly todos={data} /> : <div>No Todos</div>
}

// This implementation is intentionally flawed by waiting for the data to be available
// Before rendering the Child components to showcase how non typesafe query keys can become problematic
export default function QueryKeys() {
  const [isToggled, setIsToggled] = useState(false)
  const [timer, setTimer] = useState(0)
  const { data } = useQuery({
    queryKey: ["todos", "list", { filters: { isComplete: isToggled } }],
    queryFn: () => api.getTodos(isToggled ? "complete" : "incomplete"),
  })

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

// In the Examples, we will Refactor From Imperative -> Declarative, and then QueryKey to QueryKey Factory
