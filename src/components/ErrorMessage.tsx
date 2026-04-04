import { AlertCircle, RefreshCcw } from 'lucide-react';

interface ErrorMessageProps {
  errorData: { title: string; description: string };
  onRetry?: () => void;
}

export const ErrorMessage = ({ errorData, onRetry }: ErrorMessageProps) => (
  <div className="flex flex-col items-center justify-center w-full max-w-xl  mx-auto p-1 animate-in fade-in zoom-in duration-500">
    <div className="bg-red-500/10 p-5 rounded-full mb-6">
      <AlertCircle className="text-red-500" size={40} />
    </div>
    <h3 className="text-white font-black mb-2 text-xl tracking-tight uppercase">
      {errorData.title}
    </h3>
    <p className="text-zinc-500 text-[10px] sm:text-sm text-center mb-8 uppercase tracking-widest font-bold opacity-70 leading-relaxed">
      {errorData.description}
    </p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="flex items-center gap-3 px-8 py-3 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 text-xs font-black uppercase tracking-[0.2em] rounded-xl transition-all active:scale-95"
      >
        <RefreshCcw size={16} /> Retry
      </button>
    )}
  </div>
);