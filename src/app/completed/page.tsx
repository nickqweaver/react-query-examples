import Link from "next/link"

export default function App() {
  // Notice an Entire refetch occurs when we remount the Imperative Query
  return (
    <main className="App dark flex flex-col p-4">
      <h1 className="text-4xl font-bold mb-6">Examples</h1>
      <ul className="flex flex-col gap-1 underline text-blue-500">
        <Link href={"/completed/imperative-query"} className="cursor-pointer">
          Imperative Query
        </Link>
        <Link href={"/completed/declarative-query"} className="cursor-pointer">
          Declarative Query
        </Link>
        <Link href={"/completed/query-keys"} className="cursor-pointer">
          Problems with QueryKeys
        </Link>
        <Link href={"/completed/query-key-factory"} className="cursor-pointer">
          Fixed with Query Key Factory
        </Link>

        <Link href={"/completed/mutation"} className="cursor-pointer">
          Mutation
        </Link>
        <Link
          href={"/completed/optimistic-mutation"}
          className="cursor-pointer"
        >
          Optimistic Mutation
        </Link>
      </ul>
    </main>
  )
}
