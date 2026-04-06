export const ClientTableSkeleton = () => (
  <>
    {[...Array(6)].map((_, i) => (
      <tr key={i} className="border-b border-zinc-900/50">
        <td className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg shimmer-bg border border-zinc-800" />
            <div className="h-4 w-32 rounded shimmer-bg" />
          </div>
        </td>
        <td className="p-6"><div className="h-3 w-24 rounded shimmer-bg opacity-50" /></td>
        <td className="p-6"><div className="h-3 w-28 rounded shimmer-bg" /></td>
        <td className="p-6"><div className="h-3 w-20 rounded shimmer-bg opacity-50" /></td>
        <td className="p-6"><div className="h-9 w-28 rounded-xl shimmer-bg" /></td>
        <td className="p-6 text-right"><div className="h-8 w-16 ml-auto rounded-lg shimmer-bg opacity-50" /></td>
      </tr>
    ))}
  </>
);

export const ClientMobileSkeleton = () => (
  <div className="divide-y divide-zinc-900">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="p-5 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl shimmer-bg border border-zinc-800" />
            <div className="space-y-2">
              <div className="h-4 w-24 rounded shimmer-bg" />
              <div className="h-2 w-16 rounded shimmer-bg opacity-50" />
              <div className="h-2 w-20 rounded shimmer-bg opacity-30" />
            </div>
          </div>
          <div className="h-9 w-9 rounded-lg shimmer-bg opacity-50" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-12 rounded-xl shimmer-bg opacity-30" />
          <div className="h-12 rounded-xl shimmer-bg" />
        </div>
      </div>
    ))}
  </div>
);