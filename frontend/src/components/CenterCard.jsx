import React from "react";
import { MapPin, Phone, Clock, ArrowUpRight, CheckCircle2 } from "lucide-react";

const CenterCard = ({ center, isSelected, onSelect }) => {
  if (!center) return null;

  const {
    name,
    category,
    address,
    phone,
    accepted_items = [],
    distance,
    hours
  } = center;

  // Category specific styling
  const categoryColors = {
    Plastic: "bg-blue-950/40 text-blue-400 border-blue-900/60",
    Metal: "bg-teal-950/40 text-teal-400 border-teal-900/60",
    Glass: "bg-amber-950/40 text-amber-400 border-amber-900/60",
    Paper: "bg-indigo-950/40 text-indigo-400 border-indigo-900/60",
    Organic: "bg-emerald-950/40 text-[#37D67A] border-emerald-900/60",
    Hazardous: "bg-red-950/40 text-red-400 border-red-900/60",
    "E-Waste": "bg-purple-950/40 text-purple-400 border-purple-900/60"
  };

  const badgeColor = categoryColors[category] || "bg-[#07140F] text-[#8AA89A] border-[#204732]";

  return (
    <div
      onClick={onSelect}
      className={`border rounded-lg p-4 font-mono text-xs transition-all duration-200 cursor-pointer ${
        isSelected
          ? "bg-[#204732]/20 border-[#37D67A] shadow-[0_0_15px_rgba(55,214,122,0.15)]"
          : "bg-[#10251C] border-[#204732] hover:border-[#37D67A]/50 hover:bg-[#10251C]/80"
      }`}
    >
      {/* Header Info */}
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div>
          <span className={`inline-block px-2.5 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider mb-1.5 ${badgeColor}`}>
            {category} Hub
          </span>
          <h4 className="text-sm font-bold text-[#E8FFF3] hover:text-[#37D67A] transition-colors leading-tight">
            {name}
          </h4>
        </div>
        <span className="text-[10px] font-bold text-[#37D67A] bg-[#07140F] border border-[#204732] px-2 py-0.5 rounded flex-shrink-0">
          {distance}
        </span>
      </div>

      {/* Address & Details */}
      <div className="space-y-1.5 text-[#8AA89A] mb-3">
        <p className="flex items-start gap-1.5">
          <MapPin size={12} className="text-[#37D67A] mt-0.5 flex-shrink-0" />
          <span className="font-sans leading-relaxed">{address}</span>
        </p>
        <p className="flex items-center gap-1.5">
          <Phone size={12} className="text-[#37D67A] flex-shrink-0" />
          <span className="font-sans">{phone}</span>
        </p>
        <p className="flex items-center gap-1.5">
          <Clock size={12} className="text-[#37D67A] flex-shrink-0" />
          <span className="font-sans text-[11px]">{hours}</span>
        </p>
      </div>

      {/* Accepted Materials List */}
      <div className="border-t border-[#204732]/50 pt-2.5">
        <p className="text-[9px] uppercase tracking-wider text-[#8AA89A] mb-1.5">Accepted Materials:</p>
        <div className="flex flex-wrap gap-1">
          {accepted_items.map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#07140F] text-[#8AA89A] border border-[#204732]/60 text-[9px] font-sans"
            >
              <CheckCircle2 size={8} className="text-[#37D67A]" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Interaction Footer */}
      <div className="mt-3 flex justify-end">
        <button className="flex items-center gap-1 text-[10px] text-[#37D67A] hover:underline uppercase font-bold tracking-wider">
          Locate on Map
          <ArrowUpRight size={10} />
        </button>
      </div>
    </div>
  );
};

export default CenterCard;
