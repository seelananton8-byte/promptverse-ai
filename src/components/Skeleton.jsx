export default function Skeleton({ count = 4 }) {
  return (
    <div className="space-y-6">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-3xl border border-white/10 bg-white/5 p-6"
        >
          {/* Title */}
          <div className="h-6 w-1/3 rounded bg-white/10"></div>

          {/* Content */}
          <div className="mt-5 h-4 w-full rounded bg-white/10"></div>
          <div className="mt-3 h-4 w-5/6 rounded bg-white/10"></div>
          <div className="mt-3 h-4 w-2/3 rounded bg-white/10"></div>

          {/* Buttons */}
          <div className="mt-6 flex gap-3">
            <div className="h-10 w-24 rounded-xl bg-white/10"></div>
            <div className="h-10 w-24 rounded-xl bg-white/10"></div>
            <div className="h-10 w-24 rounded-xl bg-white/10"></div>
          </div>
        </div>
      ))}
    </div>
  );
}