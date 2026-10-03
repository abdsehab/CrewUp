import { useState } from "react";
import { useCarbonFootprint } from "react-carbon-footprint";
import { Leaf, ChevronUp, ChevronDown } from "lucide-react";

const CarbonFootprintDisplay = () => {
  const [gCO2, bytesTransferred] = useCarbonFootprint();
  const [isExpanded, setIsExpanded] = useState(false);

  // Safe formatting helper
  const formattedCo2 = typeof gCO2 === "number" ? gCO2.toFixed(3) : Number(gCO2 || 0).toFixed(3);
  const formattedBytes = typeof bytesTransferred === "number" ? bytesTransferred.toLocaleString() : "0";

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 9999,
        fontFamily: "inherit",
      }}
    >
      <div
        className="rounded-xl border border-[#324539] bg-[#14251d]/95 p-3.5 text-[#e0e3e1] shadow-2xl backdrop-blur-md transition-all duration-300"
        style={{ minWidth: isExpanded ? "260px" : "auto" }}
      >
        <div
          className="flex cursor-pointer items-center justify-between gap-3"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#afff66]/15 text-[#afff66]">
              <Leaf size={15} />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#afff66]">
                {formattedCo2} g CO₂eq
              </span>
              <p className="text-[10px] text-[#879083]">Carbon Footprint</p>
            </div>
          </div>
          <button
            type="button"
            className="text-[#879083] hover:text-[#afff66]"
            aria-label="Toggle details"
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>

        {isExpanded && (
          <div className="mt-3 border-t border-[#324539] pt-2.5 text-xs">
            <div className="flex justify-between py-1 text-[#c1cab3]">
              <span>Data Transferred:</span>
              <span className="font-mono font-medium text-white">
                {formattedBytes} bytes
              </span>
            </div>
            <div className="flex justify-between py-1 text-[#c1cab3]">
              <span>CO₂ Emissions:</span>
              <span className="font-mono font-medium text-[#afff66]">
                {formattedCo2} grams
              </span>
            </div>
            <p className="mt-2 text-[10px] leading-tight text-[#879083]">
              Estimates based on Sustainable Web Design model (CO2.js) monitoring network data transfer during this session.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarbonFootprintDisplay;
