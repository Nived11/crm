import { useState, useEffect, useCallback, useRef } from "react";
import { useClients } from "../hooks/useClients";
import { 
  Plus, Search, Edit3, Trash2, User, X, Phone, 
  MapPin, CheckCircle2, Calendar, ArrowLeft, Building2, 
  MoreVertical, Inbox, Clock, AlertCircle
} from "lucide-react";
import { ConfirmModal } from "@/components/ConfirmModal";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Pagination } from "@/components/Pagination";
import { ClientTableSkeleton, ClientMobileSkeleton } from "./ClientSkeleton";

const ClientManager = () => {
  const {
    clients, categories, loading, isError, errorMessage, setSearch, setCategoryFilter,
    page, setPage, totalPages, hasNext, hasPrevious,
    deleteMutation, createMutation, updateMutation, createCategoryMutation, refetch,
  } = useClients();

  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [formError, setFormError] = useState(""); 

  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [categoryName, setCategoryName] = useState("");
  
  const [clientForm, setClientForm] = useState({
    owner_name: "", company_name: "", phone_number: "", location: "", category: ""
  });

  const [statusForm, setStatusForm] = useState({
    status: "Interested", remarks: ""
  });

  const [followUpDateTime, setFollowUpDateTime] = useState("");

  const scrollToTop = () => {
    const mainContainer = document.querySelector("main");
    if (mainContainer) {
      mainContainer.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const closeAllModals = useCallback(() => {
    setIsClientModalOpen(false);
    setIsCategoryModalOpen(false);
    setIsStatusModalOpen(false);
    setIsDeleteModalOpen(false);
    setFormError(""); 
    
    if (window.history.state === "modal-open") {
      window.history.back();
    }
    setTimeout(scrollToTop, 100);
  }, []);

  const openModal = (type: 'client' | 'category' | 'status', data: any = null) => {
    if (type === 'client') {
      setFormError("");
      if (data) {
        setSelectedClient(data);
        setClientForm({
          owner_name: data.owner_name,
          company_name: data.company_name,
          phone_number: data.phone_number,
          location: data.location,
          category: data.category
        });
      } else {
        setSelectedClient(null);
        setClientForm({ owner_name: "", company_name: "", phone_number: "", location: "", category: "" });
      }
      setIsClientModalOpen(true);
    } else if (type === 'category') {
      setIsCategoryModalOpen(true);
    } else if (type === 'status') {
      setSelectedClient(data);
      // Removed "Pending" check and set default to Interested
      setStatusForm({ 
        status: data.status && data.status !== "Pending" ? data.status : "Interested", 
        remarks: data.remarks || "" 
      });
      setFollowUpDateTime(data.follow_up_datetime || ""); 
      setIsStatusModalOpen(true);
    }
    
    window.history.pushState("modal-open", "");
    setTimeout(scrollToTop, 100);
  };

  useEffect(() => {
    const handlePopState = () => {
      setIsClientModalOpen(false);
      setIsCategoryModalOpen(false);
      setIsStatusModalOpen(false);
      setIsDeleteModalOpen(false);
      scrollToTop();
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setTimeout(scrollToTop, 100);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setClientForm({ ...clientForm, phone_number: value });
    if (value.length === 10) setFormError(""); 
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (clientForm.phone_number.length !== 10) {
      setFormError("Please enter a valid 10-digit phone number");
      return;
    }
    if (selectedClient) {
      await updateMutation.mutateAsync({ id: selectedClient.id, formData: clientForm });
    } else {
      await createMutation.mutateAsync(clientForm);
    }
    closeAllModals();
  };

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = { 
      status: statusForm.status,
      remarks: statusForm.remarks,
      has_called: true 
    };

    if (statusForm.status === "Follow Up Later" && followUpDateTime) {
      payload.follow_up_datetime = followUpDateTime;
    } else {
      payload.follow_up_datetime = null;
    }
    
    await updateMutation.mutateAsync({ id: selectedClient.id, formData: payload });
    closeAllModals();
  };

  const clearSearch = () => {
    setSearchValue("");
    setSearch("");
  };

  return (
    <div className="bg-black min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-0">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6 ">
          <div className="flex flex-col md:flex-row w-full lg:w-auto gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchValue}
                onChange={(e) => {setSearchValue(e.target.value); setSearch(e.target.value)}}
                className="w-full bg-zinc-900/40 border border-zinc-800 text-white pl-11 pr-10 py-2.5 md:py-3 rounded-xl md:rounded-2xl outline-none focus:border-brand/40 text-sm transition-all"
              />
              {searchValue && (
                <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
                  <X size={16} />
                </button>
              )}
            </div>
            
            <select 
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-zinc-900/40 border border-zinc-800 text-white px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl outline-none text-sm focus:border-brand/40 cursor-pointer"
            >
              <option value="" className="bg-zinc-950">All Categories</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id} className="bg-zinc-950">{cat.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex w-full md:w-auto gap-2 md:gap-3">
            <button onClick={() => openModal('category')} className="flex-1 md:flex-none border border-zinc-800 text-zinc-400 px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider hover:bg-zinc-900 transition-all">
              <Plus size={16} /> <span>Category</span>
            </button>
            <button onClick={() => openModal('client')} className="flex-1 md:flex-none bg-brand text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand/20 active:scale-95 transition-all">
              <Plus size={16} /> Add Client
            </button>
          </div>
        </div>

        <div className="bg-[#080808] border border-zinc-900 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
          
         {loading ? (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-zinc-900/50">
                    <ClientTableSkeleton />
                  </tbody>
                </table>
              </div>
              <div className="md:hidden">
                <ClientMobileSkeleton />
              </div>
            </>
          ) :isError ? (
            <div className="p-10"><ErrorMessage errorData={errorMessage!} onRetry={refetch}/></div>
          ) : clients.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
              <div className="w-16 h-16 bg-zinc-900/50 rounded-full flex items-center justify-center mb-4 border border-zinc-800">
                <Inbox size={32} className="text-zinc-700" />
              </div>
              <h3 className="text-white font-bold text-lg">No clients found</h3>
              <p className="text-zinc-500 text-sm max-w-xs mt-1">Try adjusting your search or add a new client.</p>
            </div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-900 bg-zinc-900/20">
                      <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Owner Name</th>
                      <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Company</th>
                      <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Contact</th>
                      <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Location</th>
                      <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Status</th>
                      <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900/50">
                    {clients.map((client: any) => (
                      <tr key={client.id} className="hover:bg-zinc-900/20 transition-colors group">
                        <td className="p-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-500 border border-zinc-800">
                              <User size={14} />
                            </div>
                            <p className="text-sm font-bold text-white">{client.owner_name}</p>
                          </div>
                        </td>
                        <td className="p-6">
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{client.company_name}</p>
                        </td>
                        <td className="p-6 text-sm text-zinc-400 font-medium">
                          <a href={`tel:${client.phone_number}`} className="hover:text-brand transition-colors">+91 {client.phone_number}</a>
                        </td>
                        <td className="p-6 text-sm text-zinc-500 font-medium">
                          <div className="flex items-center gap-1.5"><MapPin size={14} className="text-zinc-700"/> {client.location}</div>
                        </td>
                        <td className="p-6">
                          <button 
                            disabled={client.has_called}
                            onClick={() => openModal('status', client)}
                            className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                              client.has_called 
                              ? 'bg-brand/10 border-brand/20 text-brand cursor-default' 
                              : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-white'
                            }`}
                          >
                            {client.has_called ? <><CheckCircle2 size={14}/> Called</> : "Mark Called"}
                          </button>
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex justify-end gap-2 ">
                            <button onClick={() => openModal('client', client)} className="p-2 bg-zinc-900 rounded-lg text-zinc-500 hover:text-white transition-all"><Edit3 size={14} /></button>
                            <button onClick={() => { setSelectedClient(client); setIsDeleteModalOpen(true); }} className="p-2 bg-zinc-900 rounded-lg text-zinc-500 hover:text-red-500 transition-all"><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden divide-y divide-zinc-900">
                {clients.map((client: any) => (
                  <div key={client.id} className="p-5 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
                          <User size={18} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{client.owner_name}</h4>
                          <div className="flex flex-col gap-0.5">
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{client.company_name}</p>
                            <div className="flex items-center gap-1 text-[9px] text-zinc-600 font-medium">
                              <MapPin size={10} className="text-zinc-700" />
                              <span>{client.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative">
                         <button 
                            onClick={() => setActiveMobileMenu(activeMobileMenu === client.id ? null : client.id)}
                            className="p-2 bg-zinc-900 rounded-lg text-zinc-400"
                         >
                            <MoreVertical size={18} />
                         </button>
                         {activeMobileMenu === client.id && (
                           <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-[60] overflow-hidden">
                              <button onClick={() => {openModal('client', client); setActiveMobileMenu(null)}} className="w-full text-left px-4 py-3 text-[10px] font-bold text-zinc-300 uppercase tracking-widest border-b border-zinc-800 flex items-center gap-2">
                                <Edit3 size={14}/> Edit Lead
                              </button>
                              <button onClick={() => {setSelectedClient(client); setIsDeleteModalOpen(true); setActiveMobileMenu(null)}} className="w-full text-left px-4 py-3 text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
                                <Trash2 size={14}/> Delete
                              </button>
                           </div>
                         )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <a href={`tel:${client.phone_number}`} className="bg-zinc-900/40 p-3 rounded-xl border border-zinc-900 block">
                         <p className="text-[8px] text-zinc-600 font-black uppercase tracking-widest mb-1">Mobile</p>
                         <p className="text-xs text-zinc-300 font-medium">{client.phone_number}</p>
                      </a>

                      <div className="bg-zinc-900/40 p-1 rounded-xl border border-zinc-900 flex items-center justify-center">
                        <button 
                          disabled={client.has_called}
                          onClick={() => openModal('status', client)}
                          className={`w-full h-full flex items-center justify-center gap-2 py-3 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                            client.has_called 
                            ? 'bg-brand/10 text-brand' 
                            : 'bg-brand text-white shadow-lg shadow-brand/20 active:scale-95'
                          }`}
                        >
                          {client.has_called ? <><CheckCircle2 size={12}/> Called</> : <><Phone size={12}/> Mark Called</>}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="mt-6 md:mt-8">
          <Pagination 
            currentPage={page} 
            totalPages={totalPages} 
            hasNext={hasNext} 
            hasPrevious={hasPrevious} 
            onPageChange={handlePageChange} 
            isLoading={loading} 
          />
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* Category Modal */}
      {isCategoryModalOpen && (
        <div 
          onClick={closeAllModals}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0c0c0c] w-full max-w-sm rounded-2xl border border-zinc-800 p-8 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
                <button onClick={closeAllModals} className="p-2 -ml-2 text-zinc-400">
                  <ArrowLeft size={20} />
                </button>
                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] text-center">New Category</h3>
            </div>
            <input 
              value={categoryName} 
              onChange={(e) => setCategoryName(e.target.value)} 
              className="w-full bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl text-sm text-white outline-none focus:border-brand/50 mb-6" 
              placeholder="e.g. Jewellery, Textiles" 
            />
            <div className="flex gap-3">
              <button onClick={closeAllModals} className="flex-1 text-zinc-500 font-bold text-[10px] uppercase tracking-widest">Cancel</button>
              <button 
                disabled={createCategoryMutation.isPending}
                onClick={() => createCategoryMutation.mutateAsync(categoryName).then(() => {setCategoryName(""); closeAllModals()})}
                className="flex-1 bg-brand text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest disabled:opacity-50"
              >
                {createCategoryMutation.isPending ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Client Add/Edit Modal */}
      {isClientModalOpen && (
        <div 
          onClick={closeAllModals}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black md:bg-black/90 md:backdrop-blur-md"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0c0c0c] w-full h-full md:h-auto md:max-w-2xl md:rounded-2xl md:border md:border-zinc-800 overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="sticky top-0 z-10 px-6 py-5 md:px-8 border-b border-zinc-900 flex justify-between items-center bg-black/50 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <button onClick={closeAllModals} className="md:hidden p-2 -ml-2 text-zinc-400"><ArrowLeft size={20} /></button>
                <h2 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{selectedClient ? "Edit Lead" : "New Lead Registration"}</h2>
              </div>
              <button onClick={closeAllModals} className="hidden md:flex p-2 bg-zinc-900 rounded-full text-zinc-500 hover:text-white"><X size={20}/></button>
            </div>

            <form onSubmit={handleAddClient} className="p-6 md:p-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Owner Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700" size={16}/>
                    <input required value={clientForm.owner_name} onChange={(e) => setClientForm({...clientForm, owner_name: e.target.value})} className="w-full bg-zinc-900/30 border border-zinc-800 p-4 pl-12 rounded-2xl text-sm text-white outline-none focus:border-brand/40" placeholder="Enter Owner Name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Company Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700" size={16}/>
                    <input required value={clientForm.company_name} onChange={(e) => setClientForm({...clientForm, company_name: e.target.value})} className="w-full bg-zinc-900/30 border border-zinc-800 p-4 pl-12 rounded-2xl text-sm text-white outline-none focus:border-brand/40" placeholder="ABC Company" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Phone Number (10 Digits)</label>
                  <div className="relative">
                    <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 ${formError ? 'text-red-500' : 'text-zinc-700'}`} size={16}/>
                    <input 
                        type="text"
                        inputMode="numeric"
                        required 
                        value={clientForm.phone_number} 
                        onChange={handlePhoneChange} 
                        className={`w-full bg-zinc-900/30 border p-4 pl-12 rounded-2xl text-sm text-white outline-none transition-colors ${formError ? 'border-red-500/50 focus:border-red-500' : 'border-zinc-800 focus:border-brand/40'}`} 
                        placeholder="Enter 10-digit number" 
                    />
                  </div>
                  {formError && (
                    <p className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-1 ml-1 animate-in slide-in-from-top-1">
                      <AlertCircle size={12}/> {formError}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700" size={16}/>
                    <input required value={clientForm.location} onChange={(e) => setClientForm({...clientForm, location: e.target.value})} className="w-full bg-zinc-900/30 border border-zinc-800 p-4 pl-12 rounded-2xl text-sm text-white outline-none focus:border-brand/40" placeholder="Enter Location" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Business Category</label>
                <select required value={clientForm.category} onChange={(e) => setClientForm({...clientForm, category: e.target.value})} className="w-full bg-zinc-900/30 border border-zinc-800 p-4 rounded-2xl text-sm text-white outline-none focus:border-brand/40 appearance-none cursor-pointer">
                  <option value="" className="bg-zinc-950">Select Category</option>
                  {categories.map((cat: any) => (
                    <option key={cat.id} value={cat.id} className="bg-zinc-950">{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4">
                <button 
                    type="submit" 
                    disabled={createMutation.isPending || updateMutation.isPending}
                    className="cursor-pointer w-full bg-brand text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-brand/20 active:scale-[0.98] transition-all disabled:opacity-70"
                >
                  {selectedClient 
                    ? (updateMutation.isPending ? "Updating Lead..." : "Update Information") 
                    : (createMutation.isPending ? "Registering Lead..." : "Register Lead")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Call Status Modal */}
      {isStatusModalOpen && (
        <div 
          onClick={closeAllModals}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in zoom-in-95 duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0c0c0c] w-full max-w-md rounded-2xl border border-zinc-800 p-8 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Log Call Outcome</h2>
              <button onClick={closeAllModals} className="text-zinc-600 hover:text-white"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleStatusUpdate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Response</label>
                <select required className="w-full bg-zinc-900/30 border border-zinc-800 p-4 rounded-2xl text-sm text-white outline-none focus:border-brand/40" value={statusForm.status} onChange={(e) => setStatusForm({...statusForm, status: e.target.value})}>
                  {/* "Pending" option removed from here */}
                  <option value="Interested" className="bg-zinc-950">Interested</option>
                  <option value="Not Interested" className="bg-zinc-950">Not Interested</option>
                  <option value="Busy" className="bg-zinc-950">Busy / Call Later</option>
                  <option value="Follow Up Later" className="bg-zinc-950">Follow Up Later</option>
                </select>
              </div>

              {statusForm.status === "Follow Up Later" && (
                <div className="space-y-2 animate-in slide-in-from-top-2">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Calendar size={12}/> Follow-up Date & Time
                  </label>
                  <input 
                    type="datetime-local" 
                    required 
                    className="w-full bg-zinc-900/30 border border-zinc-800 p-4 rounded-2xl text-sm text-white outline-none focus:border-brand/40 [color-scheme:dark]" 
                    value={followUpDateTime}
                    onChange={(e) => setFollowUpDateTime(e.target.value)} 
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Remarks</label>
                <textarea className="w-full bg-zinc-900/30 border border-zinc-800 p-4 rounded-2xl text-sm text-white outline-none focus:border-brand/40 min-h-[100px] resize-none" placeholder="Notes about the conversation..." value={statusForm.remarks} onChange={(e) => setStatusForm({...statusForm, remarks: e.target.value})} />
              </div>

              <button type="submit" disabled={updateMutation.isPending} className="w-full bg-brand text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-brand/20 active:scale-95 transition-all disabled:opacity-50">
                {updateMutation.isPending ? "Confirming..." : "Confirm & Mark Called"}
              </button>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal 
        isOpen={isDeleteModalOpen} 
        onClose={closeAllModals} 
       onConfirm={() => {
          if (selectedClient?.id) {
            deleteMutation.mutateAsync(selectedClient.id).then(() => closeAllModals());
          }
        }}
        title="Delete this Lead?" 
        loading={deleteMutation.isPending} 
      />
    </div>
  );
};

export default ClientManager;