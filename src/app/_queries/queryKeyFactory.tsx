import { api } from "../_mockAPI/api"

export const queryKeyFactory = {
  todo: {
    list: (filters: { isComplete?: boolean }) => ({
      queryKey: ["todos", "list", { filters }],
      queryFn: () =>
        api.getTodos(
          typeof filters.isComplete === "undefined"
            ? undefined
            : filters.isComplete
            ? "complete"
            : "incomplete"
        ),
    }),
    detail: (id: number) => ({
      queryKey: ["todo", "detail", id],
      queryFn: api.getTodo(id),
    }),
  },
}
