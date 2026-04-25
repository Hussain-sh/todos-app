import { Todo } from "../lib/api";
import TodoCard from "./TodoCard";
export default function TodoGrid({ todos }: { todos: Todo[] }) {
  return (
    <div className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {todos.map((todo: Todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
