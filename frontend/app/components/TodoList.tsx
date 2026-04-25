"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos, Todo } from "../lib/api";
import { useEffect, useMemo, useState } from "react";
import TodoGrid from "./TodoGrid";
import TodoItem from "./TodoItem";
import Spinner from "./Spinner";
import toast from "react-hot-toast";

export default function TodoList() {
  const [showAll, setShowAll] = useState<boolean>(false);
  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const visibleTodos = useMemo(() => {
    if (!todos) return [];
    return showAll ? todos : todos?.slice(0, 4);
  }, [todos, showAll]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Failed to fetch tasks.");
    }
  }, [isError, error]);

  if (isLoading) return <Spinner />;

  return (
    <div className="w-full flex flex-col gap-4">
      {showAll ? (
        <TodoGrid todos={visibleTodos} />
      ) : (
        visibleTodos.map((todo: Todo) => <TodoItem key={todo.id} todo={todo} />)
      )}
      {todos && todos.length > 4 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-4 py-1 text-white bg-transparent text-lg underline cursor-pointer mt-2"
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      )}
    </div>
  );
}
