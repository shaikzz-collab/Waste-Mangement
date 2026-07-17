import React from "react";
import { Calendar, RefreshCw, AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";

const HistoryCard = ({ scan, onSelect, isSelected }) => {
  if (!scan) return null;

  const {
    item_name,
    category,
    emoji,
    recyclable,
    hazardous,
    timestamp
  } = scan;

  // Format date nicely
  const formatDate = (isoString) => {
    if (!isoString) return "";
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (e) {
      return isoString;
    }
  };

  // Category specific styles
  const categoryColors = {
    Plastic: "bg-blue-950/30 text-blue-400 border-blue-900/40",
    Metal: "bg-teal-950/30 text-teal-400 border-teal-900/40",
    Glass: "bg-amber-950/30 text-amber-400 border-amber-900/40",
    Paper: "bg-indigo-950/30 text-indigo-400 border-indigo-900/40",
    Organic: "bg-emerald-950/30 text-[#37D67A] border-emerald-900/40",
    Hazardous: "bg-red-950/30 text-red-400 border-red-900/40",
    "E-Waste": "bg-purple-950/30 text-purple-400 border-purple-900/40"
  };

  const badgeColor = categoryColors[category] || "bg-[#07140F] text-[#8AA89A] border-[#204732]";

  return (
    <div
      onClick={onSelect}
      className={`border rounded-lg p-4 font-mono text-xs transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isSelected
          ? "bg-[#204732]/20 border-[#37D67A] shadow-[0_0_15px_rgba(55,214,122,0.1)]"
          : "bg-[#10251C] border-[#204732] hover:border-[#37D67A]/50 hover:bg-[#10251C]/80"
      }`}
    >
      {/* Left side: Item Name & Date */}
      <div className="flex items-start gap-3">
        <span className="text-3xl filter drop-shadow-[0_0_4px_rgba(55,214,122,0.2)]" role="img" aria-label={category}>
          {emoji || "🗑️"}
        </span>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-[#E8FFF3] uppercase tracking-wide leading-tight">
            {item_name}
          </h4>
          <div className="flex items-center gap-1 text-[#8AA89A] font-sans">
            <Calendar size={11} className="text-[#37D67A]" />
            <span>{formatDate(timestamp)}</span>
          </div>
        </div>
      </div>

      {/* Right side: Indicators & Action */}
      <div className="flex items-center justify-between sm:justify-end gap-3 border-t border-[#204732]/40 sm:border-0 pt-2 sm:pt-0">
        <div className="flex gap-2">
          {/* Category Chip */}
          <span className={`px-2.5 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider ${badgeColor}`}>
            {category}
          </span>

          {/* Recyclable tag */}
          {recyclable && (
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded border border-emerald-900 bg-emerald-950/40 text-emerald-400 text-[9px] font-bold uppercase tracking-wider">
              <RefreshCw size={8} className="animate-spin-slow" />
              Recycle
            </span>
          )}

          {/* Hazardous tag */}
          {hazardous && (
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded border border-red-900 bg-red-950/40 text-red-400 text-[9px] font-bold uppercase tracking-wider">
              <AlertTriangle size={8} className="animate-pulse" />
              Hazard
            </span>
          )}
        </div>

        {/* Arrow details indicator */}
        <button className="hidden sm:flex items-center justify-center w-7 h-7 rounded-full bg-[#07140F] border border-[#204732] text-[#37D67A] hover:bg-[#37D67A] hover:text-[#07140F] transition-all duration-200">
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default HistoryCard;
