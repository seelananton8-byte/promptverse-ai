import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownViewer({ content }) {
  return (
    <div
      className="
        whitespace-pre-wrap
        text-gray-300
        leading-relaxed

        [&>h1]:text-3xl
        [&>h1]:font-bold
        [&>h1]:text-white

        [&>h2]:text-2xl
        [&>h2]:font-semibold
        [&>h2]:text-white

        [&>h3]:text-xl
        [&>h3]:font-semibold
        [&>h3]:text-white

        [&>p]:mb-4

        [&>ul]:list-disc
        [&>ul]:pl-6

        [&>ol]:list-decimal
        [&>ol]:pl-6

        [&>li]:mb-2

        [&_strong]:text-white

        [&_code]:bg-white/10
        [&_code]:px-1
        [&_code]:rounded
        [&_code]:text-cyan-400

        [&_pre]:overflow-x-auto
        [&_pre]:max-w-full
        [&_pre]:bg-[#0B1120]
        [&_pre]:p-4
        [&_pre]:rounded-xl
        [&_pre]:border
        [&_pre]:border-white/10
        [&_pre]:my-4

        [&_pre_code]:bg-transparent
        [&_pre_code]:p-0
      "
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}