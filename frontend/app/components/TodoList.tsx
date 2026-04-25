"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos, Todo } from "../lib/api";
import { useEffect, useMemo, useState } from "react";
import TodoGrid from "./TodoGrid";
import TodoItem from "./TodoItem";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
import NoTasks from "./NoTasks";

export default function TodoList() {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos", activeTab],
    queryFn: () => fetchTodos(showAll ? activeTab : undefined),
  });

  const visibleTodos = useMemo(() => {
    if (!todos) return [];
    return showAll ? todos : todos?.slice(0, 4);
  }, [todos, showAll]);

  const tabClass = (tab: string) =>
    `sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none tracking-wider rounded-t cursor-pointer ${
      activeTab === tab
        ? "border-primary bg-white text-primary"
        : "border-gray-200 bg-transparent text-white"
    }`;

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Failed to fetch tasks.");
    }
  }, [isError, error]);

  if (isLoading) return <Spinner />;

  return (
    <div className="w-full flex flex-col gap-4">
      {visibleTodos.length === 0 && !showAll && <NoTasks />}
      {showAll && (
        <div className="w-4/5 mx-auto py-2">
          <div className="flex gap-2 justify-start flex-wrap mb-4">
            <button
              onClick={() => setActiveTab("all")}
              className={tabClass("all")}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("todo")}
              className={tabClass("todo")}
            >
              Todo
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={tabClass("completed")}
            >
              Completed
            </button>
          </div>
        </div>
      )}

      {showAll ? (
        <TodoGrid todos={visibleTodos} loading={isLoading} />
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
