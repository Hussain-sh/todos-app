import Link from "next/link";
import { Todo } from "../lib/api";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function TodoCard({ todo }: { todo: Todo }) {
  return (
    <div className="bg-white p-4 rounded-2xl flex flex-col gap-4 shadow-md justify-start h-48">
      <div className="flex justify-start">
        <div
          className={`${todo.completed ? "bg-green-700" : "bg-black"} rounded-full`}
        >
          <AiOutlineCheckCircle size={24} />
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-2 overflow-hidden">
        <h3 className="text-2xl font-semibold text-gray-800 truncate">
          {todo.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 truncate">
          {todo.description}
        </p>
      </div>
      <div className="shrink-0">
        <Link
          href={`/todos/${todo.id}`}
          className="text-sm text-white bg-primary px-4 py-1 rounded-md"
        >
          View
        </Link>
      </div>
    </div>
  );
}
