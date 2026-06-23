import { History } from "lucide-react";

const history = [
  "React Landing Page",
  "Cold Email",
  "Resume Summary",
  "Instagram Caption",
];

export default function Recent() {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-20">

      <h2 className="text-3xl font-bold flex items-center gap-2 mb-8">
        <History className="text-cyan-400" />
        Recently Used
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {history.map((item, index) => (

          <div
            key={index}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-cyan-400 transition"
          >

            <h3>{item}</h3>

            <p className="text-sm text-gray-400 mt-2">
              Used recently
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}