import React, { useState, useEffect } from "react";
import { useStatusTracker } from "../hooks/useStatusTracker";
import { 
  Search, Edit3, Trash2, X, Calendar, 
  MessageSquare, Inbox, User, MapPin, 
  ChevronDown, ChevronUp, Phone, Tag, MoreVertical
} from "lucide-react";
import { ConfirmModal } from "@/components/ConfirmModal";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Pagination } from "@/components/Pagination";
import { ClientTableSkeleton, ClientMobileSkeleton } from "./StatusTrackerSkelton";

const StatusTracker = () => {
  const {
    clients, loading, isError, errorMessage, setSearch,
    page, setPage, totalPages, hasNext, hasPrevious,
    updateStatusMutation, deleteMutation, refetch,
  } = useStatusTracker();

  const [searchValue, setSearchValue] = useState("");
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const [statusForm, setStatusForm] = useState({ status: "Pending", remarks: "" });
  const [followUpDateTime, setFollowUpDateTime] = useState("");

  // Close modal logic
  const closeStatusModal = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsStatusModalOpen(false);
    setSelectedClient(null);
  };

  // Browser back button handle cheyyan (Optional safety)
  useEffect(() => {
    if (isStatusModalOpen) {
      const handleBackButton = (e: PopStateEvent) => {
        e.preventDefault();
        setIsStatusModalOpen(false);
      };
      window.history.pushState(null, "", window.location.pathname);
      window.addEventListener("popstate", handleBackButton);
      return () => window.removeEventListener("popstate", handleBackButton);
    }
  }, [isStatusModalOpen]);

  const toggleRow = (id: number) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const handleEditClick = (e: React.MouseEvent, client: any) => {
    e.stopPropagation();
    setSelectedClient(client);
    setStatusForm({ 
      status: client.status || "Pending", 
      remarks: client.remarks || "" 
    });
    setFollowUpDateTime(client.follow_up_datetime || "");
    setIsStatusModalOpen(true);
    setActiveMenu(null);
  };

  const handleDeleteClick = (e: React.MouseEvent, client: any) => {
    e.stopPropagation();
    setSelectedClient(client);
    setIsDeleteModalOpen(true);
    setActiveMenu(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = { 
      status: statusForm.status,
      remarks: statusForm.remarks,
    };
    if (statusForm.status === "Follow Up Later") {
      payload.follow_up_datetime = followUpDateTime;
    } else {
      payload.follow_up_datetime = null;
    }
    await updateStatusMutation.mutateAsync({ id: selectedClient.id, formData: payload });
    setIsStatusModalOpen(false);
  };

  return (
    <div className="bg-black min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-0 ">
        
        {/* Search Header */}
        <div className="mb-6 flex items-center justify-between gap-4 px-0 md:px-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
            <input
              type="text"
              placeholder="Search leads..."
              className="w-full bg-zinc-900/40 border border-zinc-800 text-white pl-11 pr-4 py-3 rounded-2xl outline-none focus:border-brand/40 text-sm transition-all"
              onChange={(e) => {setSearchValue(e.target.value); setSearch(e.target.value)}}
            />
          </div>
        </div>

        <div className="bg-[#080808] border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl mx-0 md:mx-0">
          {loading ? (
            <>
              <div className="hidden md:block"><ClientTableSkeleton /></div>
              <div className="md:hidden"><ClientMobileSkeleton /></div>
            </>
          ) : isError ? (
            <div className="p-10"><ErrorMessage errorData={errorMessage!} onRetry={refetch}/></div>
          ) : clients.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Inbox size={40} className="text-zinc-800 mb-4" />
              <h3 className="text-white font-bold tracking-tight">No leads tracked yet</h3>
              <p className="text-zinc-500 text-sm max-w-[200px] mt-2">Leads you call will appear here for status updates.</p>
            </div>
          ) : (
            <>
              {/* DESKTOP TABLE */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-900 bg-zinc-900/10">
                      <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Client & Contact</th>
                      <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Category / Location</th>
                      <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">Status</th>
                      <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900/50">
                    {clients.map((client: any) => (
                      <React.Fragment key={client.id}>
                        <tr 
                          onClick={() => toggleRow(client.id)}
                          className="hover:bg-zinc-900/30 transition-all cursor-pointer group"
                        >
                          <td className="p-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:border-brand/30 transition-colors">
                                <User size={16} />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-white leading-none mb-1.5">{client.owner_name}</p>
                                <div className="flex items-center gap-2 text-zinc-500">
                                  <Phone size={10} />
                                  <p className="text-[11px] font-medium">{client.phone_number}</p>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-6">
                             <div className="space-y-1.5">
                                <div className="flex items-center gap-2 text-zinc-400">
                                   <Tag size={12} className="text-brand/60" />
                                   <span className="text-xs font-bold uppercase tracking-tight">{client.category_name || 'General'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-500">
                                   <MapPin size={12} />
                                   <span className="text-[11px]">{client.location || 'Location N/A'}</span>
                                </div>
                             </div>
                          </td>
                          <td className="p-6 text-center">
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm ${
                              client.status === 'Interested' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 
                              client.status === 'Follow Up Later' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                              'bg-zinc-800 border-zinc-700 text-zinc-400'
                            }`}>
                              {client.status}
                            </span>
                          </td>
                          <td className="p-6 text-right">
                            <div className="flex justify-end gap-2">
                              <button onClick={(e) => handleEditClick(e, client)} className="p-2.5 bg-zinc-900 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all border border-zinc-800"><Edit3 size={14} /></button>
                              <button onClick={(e) => handleDeleteClick(e, client)} className="p-2.5 bg-zinc-900 rounded-xl text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-all border border-zinc-800"><Trash2 size={14} /></button>
                              <div className="ml-2 p-1 text-zinc-700 group-hover:text-zinc-500 transition-colors">
                                {expandedRows.includes(client.id) ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                              </div>
                            </div>
                          </td>
                        </tr>
                        {expandedRows.includes(client.id) && (
                          <tr className="bg-zinc-900/20">
                            <td colSpan={4} className="p-8 border-t border-zinc-900/50">
                               <div className="flex gap-4">
                                  <MessageSquare className="text-brand shrink-0" size={18} />
                                  <div className="space-y-1">
                                     <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Call Remarks & Feedback</p>
                                     <p className="text-sm text-zinc-300 leading-relaxed italic max-w-3xl">
                                        {client.remarks ? `"${client.remarks}"` : "No remarks added for this lead."}
                                     </p>
                                     {client.follow_up_datetime && (
                                        <div className="mt-4 flex items-center gap-2 text-brand font-bold text-[10px] bg-brand/5 w-fit px-3 py-1 rounded-lg border border-brand/10 uppercase">
                                           <Calendar size={12}/> Scheduled: {new Date(client.follow_up_datetime).toLocaleString()}
                                        </div>
                                     )}
                                  </div>
                               </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE CARDS VIEW */}
              <div className="md:hidden divide-y divide-zinc-900">
                {clients.map((client: any) => (
                  <div key={client.id} className="p-5 active:bg-zinc-900/30 transition-all relative">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3 flex-1" onClick={() => toggleRow(client.id)}>
                         <div className="w-11 h-11 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500"><User size={20} /></div>
                         <div>
                            <h4 className="text-sm font-bold text-white">{client.owner_name}</h4>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{client.category_name || 'General'}</p>
                         </div>
                      </div>
                      
                      <div className="relative flex items-center gap-1">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === client.id ? null : client.id) }} 
                          className="p-2 text-zinc-500"
                        >
                          <MoreVertical size={20}/>
                        </button>
                        
                        {activeMenu === client.id && (
                          <div className="absolute right-0 top-10 w-32 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95">
                             <button onClick={(e) => handleEditClick(e, client)} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-white border-b border-zinc-800 hover:bg-zinc-800">
                                <Edit3 size={14} className="text-brand"/> Edit
                             </button>
                             <button onClick={(e) => handleDeleteClick(e, client)} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-500/10">
                                <Trash2 size={14}/> Delete
                             </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Info & Status Bar */}
                    <div className="flex flex-col gap-3" onClick={() => toggleRow(client.id)}>
                        <div className="flex gap-4 overflow-x-auto no-scrollbar">
                           <div className="flex items-center gap-1.5 text-zinc-500 shrink-0"><Phone size={10}/> <span className="text-[10px] font-bold">{client.phone_number}</span></div>
                           <div className="flex items-center gap-1.5 text-zinc-500 shrink-0"><MapPin size={10}/> <span className="text-[10px] font-bold line-clamp-1">{client.location || 'Location N/A'}</span></div>
                        </div>

                        <div className="flex items-center justify-between bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/50">
                           <div className="flex flex-col">
                              <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-0.5">Status</p>
                              <span className={`text-[10px] font-black uppercase tracking-tight ${
                                client.status === 'Interested' ? 'text-green-500' : 
                                client.status === 'Follow Up Later' ? 'text-blue-400' : 'text-zinc-400'
                              }`}>{client.status}</span>
                           </div>
                           
                           {client.follow_up_datetime && (
                             <div className="text-right">
                               <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-0.5">Follow Up</p>
                               <div className="flex items-center gap-1.5 text-brand font-bold text-[10px]">
                                  <Calendar size={10}/> {new Date(client.follow_up_datetime).toLocaleDateString()}
                               </div>
                             </div>
                           )}

                           <div className="text-zinc-700 ml-2">
                             {expandedRows.includes(client.id) ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                           </div>
                        </div>
                    </div>

                    {/* Mobile Remarks (Collapsible) */}
                    <div className={`overflow-hidden transition-all duration-300 ${expandedRows.includes(client.id) ? 'max-h-40 mt-3' : 'max-h-0'}`}>
                       <div className="bg-brand/5 p-4 rounded-2xl border border-brand/10">
                          <p className="text-[9px] font-black text-brand/60 uppercase tracking-widest mb-1 flex items-center gap-1.5"><MessageSquare size={10}/> Remarks</p>
                          <p className="text-xs text-zinc-300 italic leading-relaxed">"{client.remarks || 'No remarks added...'}"</p>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="mt-8 px-4 md:px-0">
          <Pagination currentPage={page} totalPages={totalPages} hasNext={hasNext} hasPrevious={hasPrevious} onPageChange={setPage} isLoading={loading} />
        </div>
      </div>

      {/* --- UPDATE STATUS MODAL --- */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md" onClick={(e) => closeStatusModal(e)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-[#0c0c0c] w-full max-w-md rounded-[2.5rem] border border-zinc-800 p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-8">
              <div className="space-y-1">
                <h2 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Update Call Log</h2>
                <p className="text-xs text-zinc-500 font-bold">{selectedClient?.owner_name}</p>
              </div>
              <button onClick={(e) => closeStatusModal(e)} className="text-zinc-600 hover:text-white bg-zinc-900 p-2 rounded-xl transition-colors"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Current Status</label>
                <div className="relative">
                  <select 
                    required 
                    className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-sm text-white outline-none focus:border-brand/40 appearance-none cursor-pointer"
                    value={statusForm.status} 
                    onChange={(e) => setStatusForm({...statusForm, status: e.target.value})}
                  >
                    <option value="Interested" className="bg-zinc-900 text-white p-4">Interested</option>
                    <option value="Not Interested" className="bg-zinc-900 text-white p-4">Not Interested</option>
                    <option value="Busy" className="bg-zinc-900 text-white p-4">Busy / Call Later</option>
                    <option value="Follow Up Later" className="bg-zinc-900 text-white p-4">Follow Up Later</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16}/>
                </div>
              </div>

              {statusForm.status === "Follow Up Later" && (
                <div className="space-y-2 animate-in slide-in-from-top-2">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1 flex items-center gap-2"><Calendar size={12}/> New Follow-up Date</label>
                  <input type="datetime-local" required className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-sm text-white [color-scheme:dark]" value={followUpDateTime} onChange={(e) => setFollowUpDateTime(e.target.value)} />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Call Remarks</label>
                <textarea className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-sm text-white outline-none focus:border-brand/40 min-h-[140px] resize-none" placeholder="What did the client say?" value={statusForm.remarks} onChange={(e) => setStatusForm({...statusForm, remarks: e.target.value})} />
              </div>

              <button type="submit" disabled={updateStatusMutation.isPending} className="w-full bg-brand text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-brand/20 active:scale-95 transition-all disabled:opacity-50">
                {updateStatusMutation.isPending ? "Updating Database..." : "Save Progress"}
              </button>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={() => deleteMutation.mutateAsync(selectedClient.id).then(() => setIsDeleteModalOpen(false))}
        title="Delete Call Log?" 
        loading={deleteMutation.isPending} 
      />
    </div>
  );
};

export default StatusTracker;