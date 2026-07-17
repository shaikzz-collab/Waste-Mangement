import React from "react";

const CategoryChip = ({ label, active, onClick, emoji }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${
        active
          ? "bg-[#37D67A] text-[#07140F] border-[#37D67A] font-bold shadow-[0_0_12px_rgba(55,214,122,0.4)]"
          : "bg-[#10251C] text-[#8AA89A] border-[#204732] hover:text-[#E8FFF3] hover:border-[#37D67A]/50"
      }`}
    >
      {emoji && <span className="text-sm">{emoji}</span>}
      <span>{label}</span>
    </button>
  );
};

export default CategoryChip;
