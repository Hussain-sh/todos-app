import { base_url } from "./constants";

export type Todo = {
    id: number;
    title: string;
    description: string;
    completed: boolean
}

export const fetchTodos = async () => {
    const response = await fetch(`${base_url}/tasks`);
    if(!response.ok) throw new Error('Failed to fetch todos');
    return response.json();
}

export const getTodo = async (id: number | undefined) => {
    const response = await fetch(`${base_url}/tasks/${id}`);
    if(!response.ok) throw new Error('Failed to fetch task');
    return response.json();
}