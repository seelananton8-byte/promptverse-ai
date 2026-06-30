import { Mail, PenSquare, Reply, Handshake } from "lucide-react";

export default function EmailTools({ generateEmailExtra }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 mb-4">

      <button
        onClick={() => generateEmailExtra("subject")}
        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
      >
        <Mail size={16} />
        Generate Subject
      </button>

      <button
        onClick={() => generateEmailExtra("rewrite")}
        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
      >
        <PenSquare size={16} />
        Rewrite Professionally
      </button>

      <button
        onClick={() => generateEmailExtra("followup")}
        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
      >
        <Reply size={16} />
        Generate Follow Up
      </button>

      <button
        onClick={() => generateEmailExtra("closing")}
        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
      >
        <Handshake size={16} />
        Generate Closing
      </button>

    </div>
  );
}