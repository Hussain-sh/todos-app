import TodoForm from "@/app/components/TodoForm";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <TodoForm view={true} id={Number(id)} />;
}
