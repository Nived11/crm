import React from 'react';

// 1. Desktop Table Row Skeleton
const TableRowSkeleton = () => (
  <tr className="border-b border-zinc-900/50 animate-pulse">
    {/* Serial No */}
    <td className="p-6">
      <div className="h-3 w-4 bg-zinc-900 rounded" />
    </td>
    
    {/* Company & Category */}
    <td className="p-6">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800" />
        <div className="flex flex-col gap-2">
          <div className="h-3 w-28 bg-zinc-900 rounded" />
          <div className="h-2 w-16 bg-zinc-900/60 rounded" />
        </div>
      </div>
    </td>

    {/* Contact Person */}
    <td className="p-6">
      <div className="space-y-2">
        <div className="h-3 w-20 bg-zinc-900 rounded" />
        <div className="h-2.5 w-24 bg-zinc-900/60 rounded" />
      </div>
    </td>

    {/* Location */}
    <td className="p-6">
      <div className="h-3 w-24 bg-zinc-900 rounded" />
    </td>

    {/* Days Left Countdown */}
    <td className="p-6">
      <div className="h-5 w-24 bg-zinc-900 rounded-full mx-auto" />
    </td>

    {/* Date & Action */}
    <td className="p-6 text-right">
      <div className="flex flex-col items-end gap-2">
        <div className="h-2 w-20 bg-zinc-900 rounded" />
        <div className="h-8 w-24 bg-zinc-900 rounded-xl" />
      </div>
    </td>
  </tr>
);

// 2. Mobile Card Skeleton
const MobileCardSkeleton = () => (
  <div className="p-5 border-b border-zinc-900 animate-pulse space-y-4">
    {/* Header */}
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-zinc-900 border border-zinc-800" />
        <div className="space-y-2">
          <div className="h-3.5 w-24 bg-zinc-900 rounded" />
          <div className="h-2 w-14 bg-zinc-900/60 rounded" />
        </div>
      </div>
      <div className="h-2 w-16 bg-zinc-900 rounded" />
    </div>

    {/* Middle Row Details */}
    <div className="flex gap-4">
      <div className="h-3 w-16 bg-zinc-900 rounded" />
      <div className="h-3 w-20 bg-zinc-900 rounded" />
      <div className="h-3 w-16 bg-zinc-900 rounded" />
    </div>

    {/* Bottom Bar */}
    <div className="flex items-center justify-between bg-zinc-900/30 p-3 rounded-xl border border-zinc-900/50">
      <div className="space-y-1.5">
        <div className="h-2 w-10 bg-zinc-900" />
        <div className="h-3 w-16 bg-zinc-900 rounded" />
      </div>
      <div className="h-6 w-16 bg-zinc-900 rounded-lg" />
    </div>
  </div>
);

// Main Export Component
export const RecycleSkeleton = () => {
  const dummyRows = Array(5).fill(0);

  return (
    <>
      {/* DESKTOP SKELETON */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-900 bg-zinc-900/10">
              <th className="p-6 w-16"><div className="h-2 w-4 bg-zinc-900/50 rounded" /></th>
              <th className="p-6"><div className="h-2 w-24 bg-zinc-900/50 rounded" /></th>
              <th className="p-6"><div className="h-2 w-20 bg-zinc-900/50 rounded" /></th>
              <th className="p-6"><div className="h-2 w-16 bg-zinc-900/50 rounded" /></th>
              <th className="p-6 text-center"><div className="h-2 w-16 bg-zinc-900/50 rounded mx-auto" /></th>
              <th className="p-6 text-right"><div className="h-2 w-16 bg-zinc-900/50 rounded ml-auto" /></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900/50">
            {dummyRows.map((_, i) => (
              <TableRowSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE SKELETON */}
      <div className="md:hidden divide-y divide-zinc-900">
        {dummyRows.map((_, i) => (
          <MobileCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
};