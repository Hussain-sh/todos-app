import Link from "next/link";
import TodoList from "./components/TodoList";
import { AiOutlineEdit } from "react-icons/ai";

export default function Home() {
  return (
    <>
      <TodoList />
      <Link
        href="/todos/create"
        className="px-4 py-2 rounded-md bg-primary text-white flex items-center gap-2"
      >
        <AiOutlineEdit size={20} />
        Add Todo
      </Link>
    </>
  );
}
