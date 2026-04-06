import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMessage } from '../hooks/useMessage';
import { Mail, CheckCircle2, Phone, ChevronLeft, Send } from 'lucide-react';
import { MessageListSkeleton, MessageDetailSkeleton } from './MessageSkeleton';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Pagination } from '@/components/Pagination';

const MessageCenter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const messageIdFromUrl = searchParams.get('id');

  const {
    messages,
    totalCount,
    loading,
    isError,
    errorMessage,
    refetch,
    detailMutation,
    replyMutation,
    page,
    setPage,
    hasNext,
    hasPrevious,
    totalPages,
  } = useMessage();

  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [replyText, setReplyText] = useState('');

  const scrollToTop = () => {
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
      mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (messageIdFromUrl) {
      loadMessageDetails(Number(messageIdFromUrl));
    } else {
      setSelectedMessage(null);
    }
  }, [messageIdFromUrl]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  const loadMessageDetails = async (id: number) => {
    const data = await detailMutation.mutateAsync(id);
    setSelectedMessage(data);
    setReplyText('');
    setTimeout(scrollToTop, 100);
  };

  const handleOpenMessage = (id: number) => {
    setSearchParams({ page: String(page), id: String(id) });
  };

  const handleBackToList = () => {
    setSearchParams({ page: String(page) });
    setSelectedMessage(null);
    setTimeout(scrollToTop, 100);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSearchParams({ page: String(newPage) });
    setTimeout(scrollToTop, 100);
  };

  const onSendReply = async () => {
    if (!selectedMessage) return;
    await replyMutation.mutateAsync({ id: selectedMessage.id, text: replyText });
    setSelectedMessage({
      ...selectedMessage,
      is_replied: true,
      reply_message: replyText,
    });
    setReplyText('');
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] w-full">
        <ErrorMessage errorData={errorMessage} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div id="message-center-top" className="bg-black min-h-screen text-zinc-300 mb-10">
      <div className="max-w-7xl mx-auto p-0">
        {!selectedMessage && (
          <div className="mb-8 flex items-center justify-between px-4 sm:px-0">
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Mail className="text-brand" size={28} /> Inbox
            </h1>
            <span className="text-[10px] bg-zinc-900 text-zinc-500 px-4 py-1.5 rounded-full uppercase tracking-[0.15em] font-black border border-zinc-800">
              {totalCount} Messages
            </span>
          </div>
        )}

        <div className="relative">
          {!selectedMessage ? (
            <>
              <div className="space-y-3 animate-in fade-in duration-500 px-4 sm:px-0">
                {loading ? (
                  <MessageListSkeleton />
                ) : messages.length === 0 ? (
                  <div className="p-10 text-center text-zinc-600 text-sm italic border border-zinc-900 rounded-2xl">
                    Your inbox is empty
                  </div>
                ) : (
                  messages.map((msg: any) => (
                    <div
                      key={msg.id}
                      onClick={() => handleOpenMessage(msg.id)}
                      className={`group p-4 md:p-5 cursor-pointer transition-all border border-zinc-900 rounded-xl sm:rounded-xl hover:border-brand/30 hover:bg-zinc-900/40 relative flex items-center gap-3 md:gap-4 ${!msg.is_read
                          ? 'bg-brand/5 border-brand/20'
                          : 'bg-[#0a0a0a]'
                        }`}
                    >
                      <div
                        className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full shrink-0 ${!msg.is_read
                            ? 'bg-brand shadow-[0_0_8px_rgba(37,149,102,0.4)]'
                            : 'bg-transparent'
                          }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <span
                            className={`text-sm truncate ${!msg.is_read
                                ? 'text-white font-black uppercase'
                                : 'text-zinc-500 uppercase font-medium'
                              }`}
                          >
                            {msg.name}
                          </span>
                          <span className="text-[10px] text-zinc-500 shrink-0">
                            {formatDate(msg.created_at)}
                          </span>
                        </div>
                        <h4
                          className={`text-sm truncate ${!msg.is_read ? 'text-zinc-200 font-medium' : 'text-zinc-600'
                            }`}
                        >
                          {msg.subject}
                        </h4>
                      </div>
                      <div className="flex shrink-0">
                        {msg.is_replied && (
                          <span className="text-[9px] text-brand border border-brand/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                            Replied
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <Pagination
                currentPage={page}
                totalPages={totalPages}
                hasNext={hasNext}
                hasPrevious={hasPrevious}
                onPageChange={handlePageChange}
                isLoading={loading}
              />
            </>
          ) : (
            <div className="animate-in slide-in-from-bottom-4 duration-300 px-4 sm:px-0">
              <button
                onClick={handleBackToList}
                className="mb-6 flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group"
              >
                <ChevronLeft
                  size={20}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Back to Inbox
                </span>
              </button>

              <div className="bg-[#0a0a0a] border border-zinc-900 rounded-md sm:rounded-xl overflow-hidden">
                {detailMutation.isPending ? (
                  <MessageDetailSkeleton />
                ) : (
                  <div className="p-6 md:p-10">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-8 tracking-tight">
                      {selectedMessage.subject}
                    </h2>

                    <div className="flex items-center gap-4 mb-10 pb-8 border-b border-zinc-900">
                      <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand font-black text-xl border border-brand/20">
                        {selectedMessage.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap justify-between items-center gap-2">
                          <h3 className="text-white font-bold text-xs sm:text-xl uppercase">
                            {selectedMessage.name}
                          </h3>
                          <span className="text-[10px] text-zinc-500 font-mono">
                            {formatDate(selectedMessage.created_at)}
                          </span>
                        </div>
                        <div className="text-xs text-zinc-500 flex flex-wrap gap-4 mt-1">
                          <span>{selectedMessage.email}</span>
                          {selectedMessage.phone && (
                            <span className="flex items-center gap-1">
                              <Phone size={10} /> {selectedMessage.phone}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-zinc-300 text-base leading-relaxed whitespace-pre-wrap mb-12">
                      {selectedMessage.message}
                    </div>

                    <div className="pt-10 border-t border-zinc-900">
                      {selectedMessage.is_replied ? (
                        <div className="bg-brand/5 border border-brand/20 p-6 rounded-2xl">
                          <div className="flex items-center gap-2 text-brand font-black text-[10px] uppercase tracking-widest mb-3">
                            <CheckCircle2 size={14} /> Response Sent
                          </div>
                          <p className="text-zinc-400 text-sm italic">
                            "{selectedMessage.reply_message}"
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder={`Reply to ${selectedMessage.name}...`}
                            className="w-full h-40 p-5 bg-zinc-900/50 rounded-2xl text-white outline-none border border-zinc-800 focus:border-brand/50 transition-all resize-none text-sm"
                          ></textarea>
                          <div className="flex justify-end">
                            <button
                              onClick={onSendReply}
                              disabled={replyMutation.isPending || !replyText.trim()}
                              className="bg-brand text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-30"
                            >
                              {replyMutation.isPending ? (
                                'Sending...'
                              ) : (
                                <>
                                  Send Reply <Send size={14} />
                                </>
                              )}
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