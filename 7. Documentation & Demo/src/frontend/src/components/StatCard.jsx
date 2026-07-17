import React from "react";

const StatCard = ({ title, value, icon, description, loading }) => {
  return (
    <div className="bg-[#10251C] border border-[#204732] rounded-lg p-5 font-mono relative overflow-hidden transition-all duration-300 hover:border-[#37D67A]/30 hover:shadow-[0_0_15px_rgba(55,214,122,0.05)]">
      {/* Decorative neon dot corner */}
      <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#204732] border-b border-l border-[#204732] rounded-bl-sm"></div>

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-wider text-[#8AA89A]">{title}</span>
        {icon && <div className="text-[#37D67A] p-1.5 bg-[#07140F] border border-[#204732] rounded">{icon}</div>}
      </div>

      {loading ? (
        <div className="space-y-2 animate-pulse">
          <div className="h-8 bg-[#07140F] rounded w-2/3"></div>
          <div className="h-4 bg-[#07140F] rounded w-1/2"></div>
        </div>
      ) : (
        <div>
          <div className="text-3xl font-bold font-display tracking-tight text-[#E8FFF3] text-glow mb-1">
            {value}
          </div>
          {description && (
            <p className="text-[10px] text-[#8AA89A] font-sans leading-relaxed flex items-center gap-1">
              <span className="text-[#37D67A]">⚡</span> {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;
