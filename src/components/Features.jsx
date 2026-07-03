import { ArrowRight, WandSparkles, Video, GraduationCap, Camera, Briefcase, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "AI Gallery",
    desc: "Explore stunning AI image prompts",
    icon: WandSparkles,
    gradient: "from-blue-500 to-cyan-500",
    prompt: "AI Gallery"
  },
  {
    title: "Study Assistant",
    desc: "Explain topics, generate notes & quizzes",
    icon: GraduationCap,
    gradient: "from-green-500 to-emerald-500",
    prompt: "Explain Any Topic"
  },
  {
    title: "YouTube Toolkit",
    desc: "Generate titles, descriptions & CTAs",
    icon: Video,
    gradient: "from-red-500 to-pink-500",
    prompt: "YouTube Script Generator"
  },
  {
    title: "Instagram Toolkit",
    desc: "Hooks, hashtags and viral reel ideas",
    icon:  Camera,
    gradient: "from-pink-500 to-purple-500",
    prompt: "Instagram Viral Caption"
  },
  {
    title: "LinkedIn Toolkit",
    desc: "Professional hooks and content ideas",
    icon: Briefcase,
    gradient: "from-blue-500 to-cyan-500",
    prompt: "LinkedIn Post Generator"
  },
  {
    title: "Email Toolkit",
    desc: "Subjects, rewrites and follow-up emails",
    icon: Mail,
    gradient: "from-purple-500 to-fuchsia-500",
    prompt: "Professional Email Writer"
  },
];

export default function Features({ setSelectedPrompt }) {
  const navigate = useNavigate();

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
                onClick={() => {
                  if (item.title === "AI Gallery") {
                    navigate("/gallery");
                    return;
                  }
                  
                setSelectedPrompt(item.prompt);

                 document
                .getElementById("hero-section")
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}

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