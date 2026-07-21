import { BookOpen, FileText, HelpCircle, ListChecks, Brain } from "lucide-react";

export default function StudyTools({ generateStudyExtra }) {
  const buttons = [
    {
      key: "notes",
      label: "Generate Notes",
      icon: <BookOpen size={18} />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      key: "summary",
      label: "Generate Summary",
      icon: <FileText size={18} />,
      color: "from-green-500 to-emerald-500",
    },
    {
      key: "quiz",
      label: "Generate Quiz",
      icon: <HelpCircle size={18} />,
      color: "from-orange-500 to-yellow-500",
    },
    {
      key: "mcq",
      label: "Generate MCQs",
      icon: <ListChecks size={18} />,
      color: "from-pink-500 to-purple-500",
    },
    {
      key: "explain",
      label: "Explain Concept",
      icon: <Brain size={18} />,
      color: "from-violet-500 to-fuchsia-500",
    },
  ];

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4 text-purple-300">
        📚 Study Assistant Tools
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {buttons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => generateStudyExtra(btn.key)}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r ${btn.color} hover:scale-105 transition-all duration-300 font-semibold shadow-lg`}
          >
            {btn.icon}
            <span>{btn.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}