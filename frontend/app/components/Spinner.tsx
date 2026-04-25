interface SpinnerProps {
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-5 h-5 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-4",
};

export default function Spinner({ size = "md" }: SpinnerProps) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`rounded-full border-white/20 border-t-white animate-spin ${sizeMap[size]}`}
      />
    </div>
  );
}
