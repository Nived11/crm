import React, { useState } from "react";
import { useRecycle } from "../hooks/useRecycle";
import { 
  Search, RefreshCw, Inbox, User, MapPin, 
  Building2, Tag, Phone, Clock 
} from "lucide-react";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Pagination } from "@/components/Pagination";
import { RecycleSkeleton } from "./RecycleSkeleton";
import formatDateTime from "@/utils/formatDateTime";

// Helper function to calculate days left from deleted_at date
const calculateDaysLeft = (deletedAt: string | null) => {
  if (!deletedAt) return "--";
  const deletedDate = new Date(deletedAt);
  // Add 30 days to the deleted date
  const expiryDate = new Date(deletedDate.getTime() + 30 * 24 * 60 * 60 * 1000);
  const now = new Date();
  
  // Calculate the difference in milliseconds and convert to days
  const diffTime = expiryDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Return 0 if negative, else return the remaining days
  return diffDays > 0 ? diffDays : 0;
};

const Recycle = () => {
  const {
    clients, loading, isError, errorMessage, setSearch,
    page, setPage, totalPages, hasNext, hasPrevious,
    restoreMutation, refetch,
  } = useRecycle();

  const [searchValue, setSearchValue] = useState("");

  const handleRestoreClick = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    await restoreMutation.mutateAsync(id);
  };

  return (
    <div className="bg-black min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-0">
        
        {/* Header Title & Search */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 px-4 md:px-0">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
            <input
              type="text"
              placeholder="Search deleted leads..."
              className="w-full bg-zinc-900/40 border border-zinc-800 text-white pl-11 pr-4 py-3 rounded-2xl outline-none focus:border-brand/40 text-sm transition-all"
              onChange={(e) => {setSearchValue(e.target.value); setSearch(e.target.value)}}
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-zinc-500 text-xs md:text-sm mt-1">Leads will be permanently deleted after 30 days.</p>
          </div>
        </div>

        {/* Main Content Box */}
        <div className="bg-[#080808] border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl mx-0 md:mx-0">
         {loading ? (
          <RecycleSkeleton />
        ) : isError ? (
            <div className="p-10"><ErrorMessage errorData={errorMessage!} onRetry={refetch}/></div>
          ) : clients.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Inbox size={40} className="text-zinc-800 mb-4" />
             <h3 className="text-white font-bold tracking-tight">Recycle Bin is empty</h3>
              <p className="text-zinc-500 text-sm max-w-[250px] mt-2">Deleted leads will appear here for 30 days before permanent removal.</p>
            </div>
          ) : (
            <>
              {/* DESKTOP TABLE VIEW */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-900 bg-zinc-900/10">
                      <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest w-16">No</th>
                      <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Company & Category</th>
                      <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Contact Person</th>
                      <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Location</th>
                      <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">Time Left</th>
                      <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900/50">
                    {clients.map((client: any, index: number) => {
                      const daysLeft = calculateDaysLeft(client.deleted_at);
                      return (
                      <tr key={client.id} className="hover:bg-zinc-900/20 transition-colors group">
                        
                        {/* Serial Number */}
                        <td className="p-6">
                          <span className="text-[10px] text-zinc-600 font-bold font-mono">
                            {(index + 1).toString().padStart(2, '0')}
                          </span>
                        </td>

                        {/* Company & Category */}
                        <td className="p-6">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-500 border border-zinc-800 group-hover:border-brand/30 transition-colors">
                              <Building2 size={16} />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-[11px] text-zinc-200 font-bold uppercase tracking-wider leading-none">
                                {client.company_name || 'N/A'}
                              </p>
                              <div className="flex items-center gap-1.5">
                                <Tag size={10} className="text-brand/60" />
                                <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-tight">
                                  {client.category_name || 'General'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Contact Person */}
                        <td className="p-6">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 text-white">
                              <User size={12} className="text-zinc-500" />
                              <span className="text-xs font-bold">{client.owner_name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-zinc-500">
                              <Phone size={10} />
                              <span className="text-[11px] font-medium">{client.phone_number}</span>
                            </div>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="p-6">
                          <div className="flex items-center gap-2 text-zinc-500">
                            <MapPin size={12} />
                            <span className="text-[11px]">{client.location || 'Location N/A'}</span>
                          </div>
                        </td>

                        {/* Days Left Countdown */}
                        <td className="p-6 text-center">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm flex items-center justify-center gap-1.5 w-fit mx-auto ${
                            (typeof daysLeft === 'number' && daysLeft <= 7)
                            ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                            : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                          }`}>
                            <Clock size={10} />
                            {daysLeft} Days Left
                          </span>
                        </td>

                        {/* Restore Button */}
                        <td className="p-6 text-right">
                          <div className="flex flex-col items-end gap-2">
                            <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-tighter mb-0.5">
                              Deleted: {formatDateTime(client.deleted_at)}
                            </span>
                            <button 
                              onClick={(e) => handleRestoreClick(e, client.id)}
                              disabled={restoreMutation.isPending}
                              className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-black text-zinc-400 hover:text-white hover:border-zinc-600 transition-all active:scale-95 disabled:opacity-50"
                            >
                              <RefreshCw size={12} className={restoreMutation.isPending ? "animate-spin" : ""} />
                              Restore Lead
                            </button>
                          </div>
                        </td>

                      </tr>
                    )})}
                  </tbody>
                </table>
              </div>

              {/* MOBILE CARDS VIEW */}
              <div className="md:hidden divide-y divide-zinc-900">
                {clients.map((client: any) => {
                  const daysLeft = calculateDaysLeft(client.deleted_at);
                  return (
                  <div key={client.id} className="p-5 active:bg-zinc-900/30 transition-all relative">
                    
                    {/* Header: Company and Date */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-11 h-11 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
                          <Building2 size={20} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{client.company_name || 'N/A'}</h4>
                          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{client.category_name || 'General'}</p>
                        </div>
                      </div>
                      
                      <span className="text-[8px] text-zinc-600 font-black uppercase tracking-tighter">
                        {formatDateTime(client.deleted_at)}
                      </span>
                    </div>

                    {/* Contact Details Grid */}
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-4 overflow-x-auto no-scrollbar">
                        <div className="flex items-center gap-1.5 text-zinc-500 shrink-0">
                          <User size={10}/> <span className="text-[10px] font-bold">{client.owner_name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-zinc-500 shrink-0">
                          <Phone size={10}/> <span className="text-[10px] font-bold">{client.phone_number}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-zinc-500 shrink-0">
                          <MapPin size={10}/> <span className="text-[10px] font-bold line-clamp-1">{client.location || 'Location N/A'}</span>
                        </div>
                      </div>

                      {/* Bottom Bar: Countdown & Restore */}
                      <div className="flex items-center justify-between bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/50 gap-2">
                        <div className="flex flex-col">
                          <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-0.5">Auto Clean</p>
                          <span className={`text-[10px] font-bold uppercase tracking-tight flex items-center gap-1 ${
                            (typeof daysLeft === 'number' && daysLeft <= 7) ? 'text-red-400' : 'text-amber-400'
                          }`}>
                            <Clock size={10} /> {daysLeft} Days Left
                          </span>
                        </div>

                        <button 
                          onClick={(e) => handleRestoreClick(e, client.id)}
                          disabled={restoreMutation.isPending}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-[9px] font-black uppercase text-zinc-400 hover:text-white transition-all"
                        >
                          <RefreshCw size={10} className={restoreMutation.isPending ? "animate-spin" : ""} />
                          Restore
                        </button>
                      </div>
                    </div>

                  </div>
                )})}
              </div>
            </>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-8 px-4 md:px-0">
          <Pagination currentPage={page} totalPages={totalPages} hasNext={hasNext} hasPrevious={hasPrevious} onPageChange={setPage} isLoading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Recycle;