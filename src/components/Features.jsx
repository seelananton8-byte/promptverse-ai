import { Pencil, Code2, FileText, Hash, ArrowRight, GraduationCap, WandSparkles } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "AI Gallery",
    desc: "Explore stunning AI image prompts",
    icon: WandSparkles,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Caption",
    desc: "Create engaging captions",
    icon: Pencil,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "Study Assistant",
    desc: "Explain topics, generate notes & quizzes",
    icon: GraduationCap,
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

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >

        {features.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 hover:border-purple-500 hover:shadow-[0_0_45px_rgba(168,85,247,.35)] transition-all duration-300"
            >

              <motion.div
                whileHover={{ rotate: 8, scale: 1.1 }}
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.gradient} flex items-center justify-center shadow-lg`}
              >
                <Icon size={30} />
              </motion.div>

              <h2 className="text-2xl font-bold mt-6">
                {item.title}
              </h2>

              <p className="text-gray-400 mt-3">
                {item.desc}
              </p>

              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="mt-7 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-purple-600 group-hover:border-purple-600 transition-all"
              >
                <ArrowRight size={20} />
              </motion.button>

            </motion.div>
          );
        })}

      </motion.div>

    </section>
  );
}