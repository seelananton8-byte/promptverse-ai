import { useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Recent from "../components/Recent";
import Upgrade from "../components/Upgrade";

export default function Home() {
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [activeTool, setActiveTool] = useState("");

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-purple-700 opacity-20 blur-[180px]" />

      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-600 opacity-20 blur-[150px]" />

      <div className="relative z-10">
        <Navbar />
        <Hero selectedPrompt={selectedPrompt} setSelectedPrompt={setSelectedPrompt} activeTool={activeTool} setActiveTool={setActiveTool} />
        <Features setSelectedPrompt={setSelectedPrompt}  setActiveTool={setActiveTool} />
        <Recent />
        <Upgrade />
      </div>

    </div>
  );
}