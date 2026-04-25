import Link from "next/link";
import { Todo } from "../lib/api";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function TodoItem({ todo }: { todo: Todo }) {
  return (
    <div className="w-4/5 mx-auto bg-white p-4 rounded-2xl flex items-center gap-4 sm:w-1/2">
      <div
        className={`${todo.completed ? "bg-green-700" : "bg-black"} rounded-full`}
      >
        <AiOutlineCheckCircle size={24} />
      </div>

      <div className="flex flex-col flex-1">
        <h3 className="font-semibold text-gray-800">{todo.title}</h3>
        <p className="text-sm text-gray-500">{todo.description}</p>
      </div>

      <Link
        href={`/todos/${todo.id}`}
        className="text-sm text-white shrink-0 bg-primary px-4 py-1 rounded-md cursor-pointer"
      >
        View
      </Link>
    </div>
  );
}
