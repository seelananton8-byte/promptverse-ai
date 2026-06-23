import {
  Bot,
  Pencil,
  Mail,
  Code2,
  FileText,
  Hash,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    title: "AI Prompt",
    desc: "Generate powerful AI prompts",
    icon: Bot,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Caption",
    desc: "Create engaging captions",
    icon: Pencil,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "Email",
    desc: "Write professional emails",
    icon: Mail,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Code",
    desc: "Generate clean code",
    icon: Code2,
    gradient: "from-orange-500 to-yellow-500",
  },
  {
    title: "Resume",
    desc: "Build ATS-friendly resumes",
    icon: FileText,
    gradient: "from-purple-500 to-fuchsia-500",
  },
  {
    title: "Hashtags",
    desc: "Find trending hashtags",
    icon: Hash,
    gradient: "from-cyan-500 to-blue-500",
  },
];

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

        {features.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 hover:border-purple-500 hover:shadow-[0_0_40px_rgba(168,85,247,.25)] transition-all duration-300 hover:-translate-y-2"
            >

              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.gradient} flex items-center justify-center shadow-lg`}
              >
                <Icon size={30} />
              </div>

              <h2 className="text-2xl font-bold mt-6">
                {item.title}
              </h2>

              <p className="text-gray-400 mt-3">
                {item.desc}
              </p>

              <button
                className="mt-7 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-purple-600 group-hover:border-purple-600"
              >
                <ArrowRight size={20} />
              </button>

            </div>
          );
        })}

      </div>

    </section>
  );
}