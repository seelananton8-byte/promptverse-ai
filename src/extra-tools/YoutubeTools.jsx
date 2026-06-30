import { Type, FileText, Hash, Image, Megaphone } from "lucide-react";

export default function YoutubeTools({ generateExtra }) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 mb-4">
                        <button
                          onClick={() => generateExtra("title")}
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
                        >
                        <Type size={16} />
                        Generate Title
                        </button>
      
                        <button
                          onClick={() => generateExtra("description")}
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
                        >
                        <FileText size={16} />
                          Generate Description
                        </button>
      
                        <button
                          onClick={() => generateExtra("hashtags")}
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
                        >
                        <Hash size={16} />
                          Generate Hashtags
                        </button>
      
                        <button
                          onClick={() => generateExtra("thumbnail")}
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
                        >
                        <Image size={16} />
                          Generate Thumbnail Ideas
                        </button>
      
                        <button
                          onClick={() => generateExtra("cta")}
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
                        >
                        <Megaphone size={16}/>
                          Generate CTA
                        </button>
                      </div>
    </div>
  );
}