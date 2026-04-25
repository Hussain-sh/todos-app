import { Todo } from "../lib/api";
import NoTasks from "./NoTasks";
import Spinner from "./Spinner";
import TodoCard from "./TodoCard";
export default function TodoGrid({
  todos,
  loading,
}: {
  todos: Todo[];
  loading: boolean;
}) {
  if (loading) return <Spinner />;
  return (
    <div className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {todos.length === 0 ? (
        <NoTasks />
      ) : (
        todos.map((todo: Todo) => <TodoCard key={todo.id} todo={todo} />)
      )}
    </div>
  );
}
