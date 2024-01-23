import { Todo } from "../_mockAPI/api"

export const TodoList = (props: {
  todos: Todo[]
  isReadOnly: boolean
  onChecked?: (id: number, isComplete: boolean) => void
}) => {
  return (
    <div className="flex flex-col items-center">
      {props.todos.map((todo) => (
        <div key={todo.id} className="flex gap-2">
          <input
            type="checkbox"
            onChange={(e) => {
              props.onChecked?.(todo.id, e.target.checked)
            }}
            checked={todo.isComplete}
            readOnly={props.isReadOnly}
          />
          {todo.title}
        </div>
      ))}
    </div>
  )
}
