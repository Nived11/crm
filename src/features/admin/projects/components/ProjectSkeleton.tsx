export const ProjectCardSkeleton = () => (
  <div className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl overflow-hidden">
    <div className="aspect-video w-full shimmer-bg" />
    <div className="p-5 space-y-3">
      <div className="h-5 w-2/3 rounded-lg shimmer-bg" />
      <div className="h-3 w-full rounded-md shimmer-bg" />
      <div className="pt-4 border-t border-zinc-900 flex justify-between">
        <div className="h-4 w-8 rounded shimmer-bg" />
        <div className="flex gap-2">
          <div className="h-8 w-8 rounded-lg shimmer-bg" />
          <div className="h-8 w-8 rounded-lg shimmer-bg" />
        </div>
      </div>
    </div>
  </div>
);