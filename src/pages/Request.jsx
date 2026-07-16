import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

export default function Request() {
   const [formData, setFormData] = useState({
  category: "",
  title: "",
  description: "",
  aiModel: "",
  name: "",
  email: "",
});

const handleSubmit = async (e) => {
  e.preventDefault();

  if (
  !formData.category ||
  !formData.title ||
  !formData.description ||
  !formData.name ||
  !formData.email
) {
  toast.error("Please fill all fields");
  return;
}

if (!/\S+@\S+\.\S+/.test(formData.email)) {
  toast.error("Enter a valid email address");
  return;
}

  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        aiModel: formData.aiModel || "Any",
        from_name: formData.name,
        reply_to: formData.email,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    toast.success("Request Submitted 🚀");

    setFormData({
      category: "",
      title: "",
      description: "",
      aiModel: "",
      name:"",
      email:"",
    });

  } catch (err) {
    console.error(err);
    toast.error("Failed to send request");
  }
};
  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-14">

      <div className="max-w-5xl mx-auto">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm"
        >
          ✨ PromptVerse Community
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-5xl md:text-7xl font-extrabold mt-6 leading-tight bg-gradient-to-r from-white via-purple-300 to-cyan-300 bg-clip-text text-transparent"
        >
          Request New
          <br />
          AI Gallery Prompt
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 max-w-3xl text-gray-400 text-lg leading-8"
        >
          Can't find the AI prompt you're looking for?
          <br />
          Submit your idea and our team will review it.
          The best requests will be added to PromptVerse AI Gallery
          in upcoming updates.
        </motion.p>

         <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
        >

        <h2 className="text-2xl font-bold mb-8">
            Submit Prompt Request
        </h2>

        <form
            onSubmit={handleSubmit}
            className="grid gap-6"
            >

            {/* Category */}

            <select
            value={formData.category}
            onChange={(e)=>
                setFormData({
                ...formData,
                category:e.target.value
                })
            }
            className="bg-[#111827] text-white border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
            >

            <option  value="" className="bg-[#111827] text-white">Select Category</option>

            <option  className="bg-[#111827] text-white">Anime</option>

            <option  className="bg-[#111827] text-white">Fantasy</option>

            <option className="bg-[#111827] text-white">Cyberpunk</option>

            <option className="bg-[#111827] text-white">Portrait</option>

            <option className="bg-[#111827] text-white">Realistic</option>

            <option className="bg-[#111827] text-white">Nature</option>

            <option className="bg-[#111827] text-white">Sci-Fi</option>

            <option className="bg-[#111827] text-white">Architecture</option>

            <option className="bg-[#111827] text-white">Other</option>

            </select>

            {/* Prompt Title */}

            <input
            type="text"
            placeholder="Prompt Title"
            value={formData.title}
            onChange={(e)=>
                setFormData({
                ...formData,
                title:e.target.value
                })
            }
            className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
            />

            {/* Description */}

            <textarea
            rows={6}
            placeholder="Describe your AI prompt request..."
            value={formData.description}
            onChange={(e)=>
                setFormData({
                ...formData,
                description:e.target.value
                })
            }
            className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none resize-none focus:border-purple-500"
            />

            <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e)=>
                    setFormData({
                    ...formData,
                    name:e.target.value
                    })
                }
                className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
                />

                <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e)=>
                    setFormData({
                    ...formData,
                    email:e.target.value
                    })
                }
                className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
                />

            {/* AI Model */}

            <select
            value={formData.aiModel}
            onChange={(e)=>
                setFormData({
                ...formData,
                aiModel:e.target.value
                })
            }
            className="bg-[#111827] text-white border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
            >

            <option value="" className="bg-[#111827] text-white">Preferred AI Model</option>

            <option className="bg-[#111827] text-white">ChatGPT Image</option>

            <option className="bg-[#111827] text-white">Flux</option>

            <option className="bg-[#111827] text-white">Midjourney</option>

            <option className="bg-[#111827] text-white">Leonardo AI</option>

            <option className="bg-[#111827] text-white">Ideogram</option>

            <option className="bg-[#111827] text-white">Any</option>

            </select>

            <button
            type="submit"
            className="mt-4 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 font-semibold hover:scale-[1.02] transition"
            >
            Submit Request
            </button>

        </form>

        </motion.div>


      </div>
    </div>
  );
}