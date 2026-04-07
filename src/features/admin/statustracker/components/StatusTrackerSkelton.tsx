import React from "react";

export const ClientTableSkeleton = () => (
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-zinc-900 bg-zinc-900/10">
          <th className="p-6 h-12 w-1/4 animate-pulse bg-zinc-900/20"></th>
          <th className="p-6 h-12 w-1/4 animate-pulse bg-zinc-900/20"></th>
          <th className="p-6 h-12 w-1/4 animate-pulse bg-zinc-900/20"></th>
          <th className="p-6 h-12 w-1/4 animate-pulse bg-zinc-900/20"></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-900/50">
        {[...Array(6)].map((_, i) => (
          <tr key={i} className="border-b border-zinc-900/50">
            {/* Client & Contact */}
            <td className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-zinc-900 rounded animate-pulse" />
                  <div className="h-3 w-20 bg-zinc-900/60 rounded animate-pulse" />
                </div>
              </div>
            </td>

            {/* Category / Location */}
            <td className="p-6">
              <div className="space-y-2">
                <div className="h-3 w-24 bg-zinc-900 rounded animate-pulse" />
                <div className="h-3 w-32 bg-zinc-900/60 rounded animate-pulse" />
              </div>
            </td>

            {/* Status Badge */}
            <td className="p-6">
              <div className="flex justify-center">
                <div className="h-6 w-24 bg-zinc-900 rounded-full animate-pulse border border-zinc-800" />
              </div>
            </td>

            {/* Actions */}
            <td className="p-6">
              <div className="flex justify-end gap-2">
                <div className="h-9 w-9 bg-zinc-900 rounded-xl animate-pulse border border-zinc-800" />
                <div className="h-9 w-9 bg-zinc-900 rounded-xl animate-pulse border border-zinc-800" />
                <div className="h-4 w-4 bg-zinc-900 rounded ml-2 animate-pulse" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Mobile Card Skeleton (Matching the card layout with status bar)
export const ClientMobileSkeleton = () => (
  <div className="divide-y divide-zinc-900">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="p-5 flex flex-col gap-4">
        {/* Top Section: Avatar & Name */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-zinc-900 border border-zinc-800 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-28 bg-zinc-900 rounded animate-pulse" />
              <div className="h-3 w-16 bg-zinc-900/60 rounded animate-pulse" />
            </div>
          </div>
          <div className="h-8 w-2 bg-zinc-900 rounded-full animate-pulse mr-2" />
        </div>

        {/* Info & Status Bar Section */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-4">
            <div className="h-3 w-20 bg-zinc-900 rounded animate-pulse" />
            <div className="h-3 w-24 bg-zinc-900 rounded animate-pulse" />
          </div>
          
          {/* Mock Status Bar */}
          <div className="h-14 w-full bg-zinc-900/40 rounded-xl border border-zinc-800/50 animate-pulse flex items-center justify-between px-4">
             <div className="space-y-1">
                <div className="h-2 w-10 bg-zinc-800 rounded animate-pulse" />
                <div className="h-3 w-16 bg-zinc-800 rounded animate-pulse" />
             </div>
             <div className="h-5 w-5 bg-zinc-800 rounded animate-pulse" />
          </div>
        </div>
      </div>
    ))}
  </div>
);