import { useMessage } from './useMessage';
import { Mail, Reply, CheckCircle2, Phone, ChevronLeft, Send } from 'lucide-react';

const MessageCenter = () => {
  const {
    messages, loading, selectedMessage, detailLoading,
    replyText, setReplyText, replying,
    handleSelectMessage, handleSendReply, setSelectedMessage
  } = useMessage();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(date);
  };

  return (
    <div className="bg-black min-h-screen text-zinc-300  md:p-0">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        {!selectedMessage && (
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Mail className="text-brand" size={28} /> Inbox
            </h1>
            <span className="text-xs bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full uppercase tracking-widest font-bold">
              {messages.length} Messages
            </span>
          </div>
        )}

        {/* --- MAIN CONTENT AREA --- */}
        <div className="relative">
          
          {/* --- MESSAGES LIST (Desktop & Mobile) --- */}
          {!selectedMessage ? (
            <div className="space-y-3 animate-in fade-in duration-500">
              {loading ? (
                <div className="p-10 text-center text-zinc-600 animate-pulse">Loading inbox...</div>
              ) : messages.length === 0 ? (
                <div className="p-10 text-center text-zinc-600 text-sm italic border border-zinc-900 rounded-2xl">Your inbox is empty</div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => handleSelectMessage(msg.id)}
                    className={`group p-5 cursor-pointer transition-all border border-zinc-900 rounded-2xl hover:border-brand/30 hover:bg-zinc-900/40 relative flex items-center gap-4 ${!msg.is_read ? 'bg-brand/5 border-brand/20' : 'bg-[#0a0a0a]'}`}
                  >
                    <div className={`w-2 h-2 rounded-full ${!msg.is_read ? 'bg-brand' : 'bg-transparent'}`} />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-sm truncate ${!msg.is_read ? 'text-white font-bold' : 'text-zinc-400'}`}>{msg.name}</span>
                        <span className="text-[10px] text-zinc-500 shrink-0">{formatDate(msg.created_at)}</span>
                      </div>
                      <h4 className={`text-sm truncate ${!msg.is_read ? 'text-zinc-200' : 'text-zinc-500'}`}>{msg.subject}</h4>
                    </div>

                    <div className="hidden md:block">
                      {msg.is_replied ? (
                        <span className="text-[9px] text-brand border border-brand/30 px-2 py-0.5 rounded-full font-bold uppercase">Replied</span>
                      ) : (
                        <span className="text-[9px] text-amber-500 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold uppercase">New</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* --- INDIVIDUAL MESSAGE VIEW --- */
            <div className="animate-in slide-in-from-bottom-4 duration-300">
              {/* Back Button & Simple Header */}
              <button 
                onClick={() => setSelectedMessage(null)} 
                className="mb-6 flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group"
              >
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-widest">Back to Inbox</span>
              </button>

              <div className="bg-[#0a0a0a] border border-zinc-900 rounded-3xl overflow-hidden">
                {detailLoading ? (
                  <div className="p-20 text-center text-brand animate-pulse font-bold uppercase tracking-widest text-xs">Opening Message...</div>
                ) : (
                  <div className="p-6 md:p-10">
                    {/* Subject */}
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 tracking-tight">{selectedMessage.subject}</h2>
                    
                    {/* Sender Info */}
                    <div className="flex items-center gap-4 mb-10 pb-8 border-b border-zinc-900">
                      <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center text-brand font-black text-xl border border-brand/20">
                        {selectedMessage.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap justify-between items-center gap-2">
                          <h3 className="text-white font-bold">{selectedMessage.name}</h3>
                          <span className="text-[10px] text-zinc-500 font-mono">{formatDate(selectedMessage.created_at)}</span>
                        </div>
                        <div className="text-xs text-zinc-500 flex flex-wrap gap-4 mt-1">
                          <span>{selectedMessage.email}</span>
                          {selectedMessage.phone && <span className="flex items-center gap-1"><Phone size={10} /> {selectedMessage.phone}</span>}
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="text-zinc-300 text-base leading-relaxed whitespace-pre-wrap mb-12">
                      {selectedMessage.message}
                    </div>

                    {/* Reply Section */}
                    <div className="pt-10 border-t border-zinc-900">
                      {selectedMessage.is_replied ? (
                        <div className="bg-brand/5 border border-brand/20 p-6 rounded-2xl">
                          <div className="flex items-center gap-2 text-brand font-black text-[10px] uppercase tracking-widest mb-3">
                            <CheckCircle2 size={14} /> Response Sent
                          </div>
                          <p className="text-zinc-400 text-sm italic">"{selectedMessage.reply_message}"</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder={`Reply to ${selectedMessage.name}...`}
                            className="w-full h-40 p-5 bg-zinc-900/50 rounded-2xl text-white placeholder:text-zinc-700 outline-none border border-zinc-800 focus:border-brand/50 transition-all resize-none text-sm"
                          ></textarea>
                          <div className="flex justify-end">
                            <button
                              onClick={() => handleSendReply(selectedMessage.id)}
                              disabled={replying || !replyText.trim()}
                              className="bg-brand text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 disabled:opacity-30 flex items-center gap-2"
                            >
                              {replying ? "Sending..." : <>Send Reply <Send size={14} /></>}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;