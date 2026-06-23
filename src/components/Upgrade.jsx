import { Crown } from "lucide-react";

export default function Upgrade() {
  return (
    <section className="max-w-7xl mx-auto px-6 my-20">

      <div className="rounded-3xl bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-600 p-10 flex flex-col md:flex-row items-center justify-between gap-8">

        <div>

          <div className="flex items-center gap-3">

            <Crown size={35} />

            <h2 className="text-4xl font-bold">
              Upgrade to Pro
            </h2>

          </div>

          <p className="mt-4 text-white/80 text-lg">
            Unlimited AI generations, premium prompts and faster responses.
          </p>

        </div>

        <button className="bg-white text-purple-700 font-bold px-8 py-4 rounded-xl hover:scale-105 transition">
          Upgrade Now →
        </button>

      </div>

    </section>
  );
}