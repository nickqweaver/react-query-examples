import { Spinner } from "@nextui-org/react"

export const Loading = () => {
  return (
    <div className="flex flex-col">
      Loading your TODOS
      <Spinner />
    </div>
  )
}
