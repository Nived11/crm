export const MessageListSkeleton = () => (
  <div className="space-y-3">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="p-5 border border-zinc-900 rounded-xl bg-[#0a0a0a] flex items-center gap-4">
        <div className="w-2.5 h-2.5 rounded-full shimmer-bg" />
        
        <div className="flex-1 space-y-3">
          <div className="flex justify-between">
            <div className="h-4 rounded-md w-1/4 shimmer-bg" />
            <div className="h-3 rounded-md w-12 shimmer-bg" />
          </div>
          <div className="h-3 rounded-md w-3/4 shimmer-bg" />
        </div>
      </div>
    ))}
  </div>
);

export const MessageDetailSkeleton = () => (
  <div className="p-6 md:p-10">
    {/* Title */}
    <div className="h-8 rounded-lg w-2/3 mb-8 shimmer-bg" />
    
    <div className="flex items-center gap-4 mb-10 pb-8 border-b border-zinc-900">
      {/* Avatar */}
      <div className="w-12 h-12 rounded-xl shimmer-bg shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 rounded w-1/4 shimmer-bg" />
        <div className="h-3 rounded w-1/3 shimmer-bg" />
      </div>
    </div>
    
    <div className="space-y-4 mb-12">
      <div className="h-4 rounded w-full shimmer-bg" />
      <div className="h-4 rounded w-[90%] shimmer-bg" />
      <div className="h-4 rounded w-[80%] shimmer-bg" />
    </div>
  </div>
);