import { History } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getRecent, formatRecentTime } from "../services/recentService";

export default function Recent() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getRecent());
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 mt-20">

      {/* Section Header */}
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold flex items-center gap-2 mb-8"
      >
        <History className="text-cyan-400" />
        Recently Used
      </motion.h2>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {history.map((item, index) => (
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
              y: -8,
              scale: 1.03,
            }}
            className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(34,211,238,.35)] transition-all duration-300"
          >

            <h3 className="text-lg font-semibold">
              {item.title}
            </h3>

            <p className="text-sm text-gray-400 mt-2">
              {formatRecentTime(item.time)}
            </p>

          </motion.div>
        ))}

      </div>

    </section>
  );
}