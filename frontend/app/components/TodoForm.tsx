"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import * as Yup from "yup";
import { getTodo } from "../lib/api";
import { base_url } from "../lib/constants";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface TodoFormProps {
  view: boolean;
  id?: number;
}

export default function TodoForm({ view, id }: TodoFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must be atleast 3 characters")
      .required("Title is requirred"),
  });

  const {
    data: todo,
    isLoading,
    refetch: refetchTodo,
  } = useQuery({
    queryKey: ["todo", id],
    queryFn: () => getTodo(id),
    enabled: view && !!id,
  });

  const updateTodoMutation = useMutation({
    mutationFn: async (updatedTodo: {
      title: string;
      description: string;
      completed: boolean;
    }) => {
      const response = await fetch(`${base_url}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const completeTodoMutation = useMutation({
    mutationFn: async (completed: boolean) => {
      const response = await fetch(
        `${base_url}/tasks/${id}/complete?completed=${completed}`,
        { method: "PATCH" },
      );
      return response.json();
    },
    onSuccess: () => {
      refetchTodo();
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const addTodoMutation = useMutation({
    mutationFn: async (newTodo: { title: string; description: string }) => {
      const base_url = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${base_url}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      formik.resetForm();
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${base_url}/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDeleted: true }),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Task deleted successfully!");
      router.push("/");
    },
  });

  const formik = useFormik({
    initialValues: {
      title: todo?.title ?? "",
      description: todo?.description ?? "",
      completed: todo?.completed ?? false,
    },
    enableReinitialize: true,
    validationSchema,

    onSubmit: (values) => {
      if (view) {
        updateTodoMutation.mutate(values);
      } else {
        addTodoMutation.mutate(values);
      }
    },
  });

  if (view && isLoading) return <div>Loading...</div>;
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full mx-auto flex flex-col sm:flex-row gap-4 justify-center items-center sm:w-4/5"
    >
      {view && (
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className="text-lg text-white capitalize">Finish</p>
          <button
            type="button"
            disabled={completeTodoMutation.isPending}
            onClick={() => completeTodoMutation.mutate(!todo?.completed)}
            className={`w-20 h-20 rounded-full flex justify-center items-center cursor-pointer disabled:opacity-50 ${
              todo?.completed ? "bg-green-700" : "bg-white"
            }`}
          >
            <FaCheck size={40} color={todo?.completed ? "#fff" : "#000"} />
          </button>
        </div>
      )}
      <div className="w-full flex flex-col gap-2 items-center sm:w-1/2">
        <div className="w-full">
          <div className="flex gap-1 items-center">
            <label htmlFor="title" className="leading-7 text-lg text-white">
              Title
            </label>
            <span className="text-sm text-red-500">*</span>
          </div>

          <input
            type="text"
            id="title"
            name="title"
            value={formik.values.title ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mt-2"
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.title as string}
            </p>
          )}
        </div>
        <div className="w-full">
          <label htmlFor="description" className="leading-7 text-lg text-white">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={formik.values.description ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full h-28 bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 transition-colors duration-200 ease-in-out resize-none align-top mt-2"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.description as string}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-4 mt-4">
          <button
            type="submit"
            disabled={
              !formik.dirty ||
              addTodoMutation.isPending ||
              updateTodoMutation.isPending
            }
            className="px-4 py-2 text-white bg-primary rounded-md cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {addTodoMutation.isPending || updateTodoMutation.isPending
              ? "Saving..."
              : view
                ? "Update task"
                : "Add task"}
          </button>
          {view && (
            <button
              className="px-4 py-2 text-white bg-red-600 rounded-md cursor-pointer font-semibold"
              type="button"
              onClick={() => deleteMutation.mutate()}
            >
              Delete
            </button>
          )}
          <Link
            href={"/"}
            className="px-4 py-2 text-white bg-primary rounded-md cursor-pointer text-center font-semibold"
          >
            Back To Todos
          </Link>
          {/* <button type="submit" className="px-4 py-2 text-white bg-primary">Add Task</button> */}
        </div>
      </div>
    </form>
  );
}
