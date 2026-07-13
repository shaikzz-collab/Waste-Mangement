import React, { useState, useEffect } from "react";
import { Terminal } from "lucide-react";

const LoadingAnimation = () => {
  const [logIndex, setLogIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const logs = [
    "INITIALIZING COGNITIVE CLASSIFICATION AGENT...",
    "ESTABLISHING SECURE CONNECTION TO GROQ ENDPOINTS...",
    "SCANNING STREAM DATA FOR STRUCTURAL MATCHES...",
    "EXTRACTING CHEMICAL AND MATERIAL COMPOSITION...",
    "VERIFYING LOCAL RECYCLING LEGISLATION POLICIES...",
    "COMPUTING OPTIMAL DISPOSAL METHODOLOGY...",
    "FINALIZING LOGGING ENTRIES TO FIRESTORE DATABASE..."
  ];

  useEffect(() => {
    // Cycle through logs
    const logInterval = setInterval(() => {
      setLogIndex((prev) => (prev < logs.length - 1 ? prev + 1 : prev));
    }, 1200);

    // Simulated progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 150);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="bg-[#10251C] border border-[#204732] rounded-lg p-6 font-mono text-xs max-w-xl mx-auto w-full terminal-glow scanline">
      {/* Title Bar */}
      <div className="flex items-center gap-2 border-b border-[#204732] pb-3 mb-4 text-[#8AA89A]">
        <Terminal size={14} className="text-[#37D67A] animate-pulse" />
        <span className="uppercase tracking-widest text-[10px] font-bold">System Analyzer Status</span>
      </div>

      {/* Terminal Shell Logs */}
      <div className="space-y-2.5 min-h-[140px] text-left">
        {logs.slice(0, logIndex + 1).map((log, index) => (
          <div key={index} className="flex gap-2 items-start">
            <span className="text-[#37D67A] font-bold select-none">&gt;</span>
            <span className={index === logIndex ? "text-[#E8FFF3] terminal-cursor" : "text-[#8AA89A]"}>
              {log}
            </span>
          </div>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="mt-6 border-t border-[#204732]/60 pt-4">
        <div className="flex justify-between mb-2 text-[#8AA89A]">
          <span>ANALYSIS COMPLETION RATE</span>
          <span className="text-[#37D67A] font-bold">{Math.min(progress, 100)}%</span>
        </div>
        
        {/* Glowing Progress Bar */}
        <div className="h-4 bg-[#07140F] border border-[#204732] rounded p-0.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#204732] to-[#37D67A] rounded-sm transition-all duration-300 shadow-[0_0_8px_rgba(55,214,122,0.4)]"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
