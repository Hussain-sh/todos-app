export default function NoTasks() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-white/50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
      <p className="text-lg font-medium">No tasks found</p>
    </div>
  );
}
