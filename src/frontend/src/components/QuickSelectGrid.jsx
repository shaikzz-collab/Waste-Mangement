import React from "react";

const QUICK_ITEMS = [
  { name: "Plastic Bottle", emoji: "🥤" },
  { name: "Aluminum Can", emoji: "🥫" },
  { name: "Cardboard Box", emoji: "📦" },
  { name: "Glass Jar", emoji: "🫙" },
  { name: "Banana Peel", emoji: "🍌" },
  { name: "LED Bulb", emoji: "💡" },
  { name: "Alkaline Battery", emoji: "🔋" },
  { name: "Old Cellphone", emoji: "📱" },
  { name: "Coffee Cup", emoji: "☕" },
  { name: "Plastic Bag", emoji: "🛍️" },
  { name: "Yogurt Container", emoji: "🥣" },
  { name: "Styrofoam Cup", emoji: "🥤" }
];

const QuickSelectGrid = ({ onSelect, disabled }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#204732] pb-2">
        <h3 className="text-xs font-mono uppercase tracking-widest text-[#8AA89A]">
          Quick Analysis Options
        </h3>
        <span className="text-[10px] font-mono text-[#37D67A] px-2 py-0.5 rounded bg-[#204732]/30 border border-[#37D67A]/20">
          SELECT DIRECTLY
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {QUICK_ITEMS.map((item) => (
          <button
            key={item.name}
            onClick={() => !disabled && onSelect(item.name)}
            disabled={disabled}
            className={`flex flex-col items-center justify-center p-3.5 rounded bg-[#10251C] border border-[#204732] font-mono text-xs text-[#E8FFF3] transition-all duration-200 cursor-pointer ${
              disabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:border-[#37D67A] hover:bg-[#204732]/20 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(55,214,122,0.1)]"
            }`}
          >
            <span className="text-2xl mb-1.5 filter drop-shadow-[0_0_4px_rgba(55,214,122,0.2)]">
              {item.emoji}
            </span>
            <span className="text-center font-semibold truncate w-full text-[#8AA89A] hover:text-[#37D67A]">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickSelectGrid;
