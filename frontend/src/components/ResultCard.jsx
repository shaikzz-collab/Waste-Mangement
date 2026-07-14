import React from "react";
import { Check, X, AlertTriangle, Lightbulb, ClipboardList, HelpCircle, Shield, Building2 } from "lucide-react";

const ResultCard = ({ result, title }) => {
  if (!result) return null;

  const {
    category,
    emoji,
    recyclable,
    reusable,
    hazardous,
    hazard_warning,
    disposal_instructions,
    recycling_steps,
    eco_suggestions,
    facility_types,
    ai_source = "WasteGuide AI"
  } = result;

  const steps = Array.isArray(recycling_steps)
    ? recycling_steps
    : (typeof recycling_steps === "string" && recycling_steps ? [recycling_steps] : []);

  const suggestions = Array.isArray(eco_suggestions)
    ? eco_suggestions
    : (typeof eco_suggestions === "string" && eco_suggestions ? [eco_suggestions] : []);

  const facilities = Array.isArray(facility_types)
    ? facility_types
    : (typeof facility_types === "string" && facility_types ? [facility_types] : []);

  return (
    <div className="bg-[#10251C] border-2 border-[#204732] rounded-lg p-6 text-[#E8FFF3] font-mono terminal-glow max-w-4xl mx-auto w-full transition-all duration-300 hover:border-[#37D67A]/40">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#204732] pb-4 mb-6 gap-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl filter drop-shadow-[0_0_8px_rgba(55,214,122,0.4)]" role="img" aria-label={category}>
            {emoji || "🗑️"}
          </span>
          <div>
            <span className="text-xs text-[#8AA89A] uppercase tracking-widest block font-sans">Scanned Object</span>
            <h2 className="text-2xl font-bold tracking-tight text-[#37D67A] text-glow uppercase">
              {title || "Unlabeled Item"}
            </h2>
          </div>
        </div>

        {/* AI Engine Badge */}
        <div className="self-start sm:self-center">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#07140F] border border-[#204732] text-xs text-[#8AA89A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#37D67A] animate-ping"></span>
            ENGINE: <span className="text-[#37D67A] font-bold">{ai_source}</span>
          </span>
        </div>
      </div>

      {/* Tri-State Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        
        {/* Recyclable Box */}
        <div className={`flex items-center justify-between p-3.5 rounded border ${
          recyclable 
            ? "bg-[#204732]/20 border-[#37D67A]/30 text-[#37D67A]" 
            : "bg-[#181111]/30 border-red-950/40 text-red-400"
        }`}>
          <div className="flex items-center gap-2.5">
            <ClipboardList size={18} />
            <span className="text-sm font-semibold uppercase tracking-wider">Recyclable</span>
          </div>
          {recyclable ? (
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#37D67A]/20 text-[#37D67A] border border-[#37D67A]">
              <Check size={14} strokeWidth={3} />
            </span>
          ) : (
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-950/30 text-red-400 border border-red-900">
              <X size={14} strokeWidth={3} />
            </span>
          )}
        </div>

        {/* Reusable Box */}
        <div className={`flex items-center justify-between p-3.5 rounded border ${
          reusable 
            ? "bg-[#204732]/20 border-[#37D67A]/30 text-[#37D67A]" 
            : "bg-[#181111]/30 border-red-950/40 text-red-400"
        }`}>
          <div className="flex items-center gap-2.5">
            <HelpCircle size={18} />
            <span className="text-sm font-semibold uppercase tracking-wider">Reusable</span>
          </div>
          {reusable ? (
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#37D67A]/20 text-[#37D67A] border border-[#37D67A]">
              <Check size={14} strokeWidth={3} />
            </span>
          ) : (
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-950/30 text-red-400 border border-red-900">
              <X size={14} strokeWidth={3} />
            </span>
          )}
        </div>

        {/* Hazardous Box */}
        <div className={`flex items-center justify-between p-3.5 rounded border ${
          hazardous 
            ? "bg-red-950/20 border-red-500/30 text-red-400" 
            : "bg-[#204732]/10 border-[#204732]/40 text-[#8AA89A]"
        }`}>
          <div className="flex items-center gap-2.5">
            <Shield size={18} />
            <span className="text-sm font-semibold uppercase tracking-wider">Hazardous</span>
          </div>
          {hazardous ? (
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-950 text-red-400 border border-red-500 animate-pulse">
              <AlertTriangle size={14} />
            </span>
          ) : (
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#07140F] text-[#8AA89A] border border-[#204732]">
              <Check size={14} />
            </span>
          )}
        </div>

      </div>

      {/* Hazardous Warning Alert (If Hazardous) */}
      {hazardous && hazard_warning && (
        <div className="mb-6 border border-red-900 bg-red-950/30 rounded p-4 flex gap-3 text-red-300">
          <AlertTriangle className="flex-shrink-0 text-red-500 animate-bounce" size={20} />
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-red-400">Hazard Warning Alert</h4>
            <p className="text-xs leading-relaxed mt-1 font-sans">{hazard_warning}</p>
          </div>
        </div>
      )}

      {/* Content Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#204732]/60 pt-6">
        
        {/* Left Column: Instructions */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm text-[#37D67A] uppercase tracking-wider border-b border-[#204732] pb-1 mb-2 font-bold flex items-center gap-2">
              <span className="text-glow">▋</span> Category Details
            </h3>
            <div className="inline-block px-3 py-1 rounded bg-[#07140F] border border-[#204732] text-xs font-bold uppercase text-[#37D67A]">
              {category || "Unassigned"}
            </div>
          </div>

          <div>
            <h3 className="text-sm text-[#37D67A] uppercase tracking-wider border-b border-[#204732] pb-1 mb-2 font-bold flex items-center gap-2">
              <span className="text-glow">▋</span> Disposal Instructions
            </h3>
            <p className="text-xs leading-relaxed text-[#8AA89A] font-sans">
              {disposal_instructions || "No specific instructions provided."}
            </p>
          </div>

          {facilities.length > 0 && (
            <div>
              <h3 className="text-sm text-[#37D67A] uppercase tracking-wider border-b border-[#204732] pb-1 mb-2 font-bold flex items-center gap-2">
                <Building2 size={16} />
                Accepted Facility Types
              </h3>
              <ul className="space-y-1.5">
                {facilities.map((fac, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-[#8AA89A] font-sans">
                    <span className="w-1.5 h-1.5 bg-[#37D67A] rounded-full"></span>
                    <span>{fac}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Steps & Eco tips */}
        <div className="space-y-6">
          {steps.length > 0 && (
            <div>
              <h3 className="text-sm text-[#37D67A] uppercase tracking-wider border-b border-[#204732] pb-1 mb-2 font-bold flex items-center gap-2">
                <span className="text-glow">▋</span> Numbered Recycling Steps
              </h3>
              <ol className="space-y-3 font-sans">
                {steps.map((step, index) => (
                  <li key={index} className="flex gap-2.5 text-xs text-[#8AA89A] leading-relaxed">
                    <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded bg-[#07140F] border border-[#204732] font-mono text-[10px] text-[#37D67A] font-semibold">
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {suggestions.length > 0 && (
            <div>
              <h3 className="text-sm text-[#37D67A] uppercase tracking-wider border-b border-[#204732] pb-1 mb-2 font-bold flex items-center gap-2">
                <Lightbulb size={16} className="text-[#37D67A]" />
                Eco Suggestions & Reduction
              </h3>
              <ul className="space-y-3 font-sans">
                {suggestions.map((sug, index) => (
                  <li key={index} className="flex gap-2 text-xs text-[#8AA89A] leading-relaxed">
                    <span className="text-[#37D67A] font-bold">»</span>
                    <span>{sug}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default ResultCard;
