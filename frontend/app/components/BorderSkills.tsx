"use client";

import React from "react";

const skillsList = [
  "ML Engineering", "MLOps", "SRE", "Cloud Infra", "Observabilitiy","Linux",
  "AWS", "GCP", "RAG", "Agentic AI", "TensorFlow", "Kubernetes", "Docker", "Python" , "SQL"
];

const repeatedSkills = [...skillsList, ...skillsList, ...skillsList, ...skillsList];

export default function BorderSkills() {
  return (
    <>
      {/* Top Border */}
      <div className="fixed top-0 left-0 w-full h-8 bg-[#020617] border-b border-cyan-500/30 z-50 overflow-hidden flex items-center shadow-[0_0_15px_rgba(6,182,212,0.2)]">
        <div className="flex w-[200%] animate-marquee-x">
          {repeatedSkills.map((s, i) => (
            <span key={i} className="whitespace-nowrap px-8 text-xs font-mono text-cyan-400 opacity-90 tracking-wider">
              {s} •
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Border */}
      <div className="fixed bottom-0 left-0 w-full h-8 bg-[#020617] border-t border-cyan-500/30 z-50 overflow-hidden flex items-center shadow-[0_0_15px_rgba(6,182,212,0.2)]">
        <div className="flex w-[200%] animate-marquee-x" style={{ animationDirection: 'reverse' }}>
          {repeatedSkills.map((s, i) => (
            <span key={i} className="whitespace-nowrap px-8 text-xs font-mono text-cyan-400 opacity-90 tracking-wider">
              {s} •
            </span>
          ))}
        </div>
      </div>

      {/* Left Border */}
      <div className="fixed top-0 left-0 h-full w-8 bg-[#020617] border-r border-cyan-500/30 z-50 overflow-hidden flex items-center shadow-[0_0_15px_rgba(6,182,212,0.2)]">
        <div className="flex flex-col h-[200%] animate-marquee-y" style={{ animationDirection: 'reverse' }}>
          {repeatedSkills.map((s, i) => (
            <span key={i} className="whitespace-nowrap py-8 font-mono text-xs text-cyan-400 opacity-90 tracking-wider" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              {s} •
            </span>
          ))}
        </div>
      </div>

      {/* Right Border */}
      <div className="fixed top-0 right-0 h-full w-8 bg-[#020617] border-l border-cyan-500/30 z-50 overflow-hidden flex items-center shadow-[0_0_15px_rgba(6,182,212,0.2)]">
        <div className="flex flex-col h-[200%] animate-marquee-y">
          {repeatedSkills.map((s, i) => (
            <span key={i} className="whitespace-nowrap py-8 font-mono text-xs text-cyan-400 opacity-90 tracking-wider" style={{ writingMode: 'vertical-rl' }}>
              {s} •
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
