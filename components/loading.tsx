export default function Loading() {
  return (
    <div
      className="flex justify-center items-center flex-1 gap-4 text-xl font-bold"
      aria-label="読み込み中"
    >
      <div className="animate-spin h-9 w-9 border-4 border-neutral-600 rounded-full border-t-transparent"></div>
      Loading...
    </div>
  );
}
