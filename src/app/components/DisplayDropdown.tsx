import React from "react";
import { ChevronDown } from "lucide-react";

export interface DisplayDropdownProps {
  showDisplayDropdown: boolean;
  setShowDisplayDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const metrics = [
  { label: "Small", value: "MC 77K", active: true },
  { label: "Large", value: "MC 77K", active: false },
];

const quickBuy = [
  { label: "Small", active: true },
  { label: "Large", active: false },
  { label: "Mega", active: false },
  { label: "Ultra", active: false, disabled: true },
];

const options = [
  { label: "Show Search Bar", icon: "🔍" },
  { label: "Show Hidden Tokens", icon: "👁️" },
  { label: "Circle Images", icon: "🖼️" },
  { label: "Progress Bar", icon: "⏳" },
  { label: "Spaced Tables", icon: "🗃️" },
];

const rows = [
  "Market Cap", "Volume", "Fees", "TX", "Socials", "Holders", "Pro Traders", "KOLs", "Dev Migrations",
  "Top 10 Holders", "Dev Holding", "Funding Time", "Snipers", "Insiders", "Bundlers", "Dex Paid"
];

const DisplayDropdown: React.FC<DisplayDropdownProps> = ({
  showDisplayDropdown,
  setShowDisplayDropdown
}) => (
  <div className="relative flex items-center space-x-2 bg-[#1a1a1a] rounded-xl px-2 py-1.5 cursor-pointer hover:bg-[#232323] transition-colors">
    <button
      className="bg-[#232323] text-white text-[15px] font-semibold px-4 py-1.5 rounded-lg border border-[#292929] shadow flex items-center gap-2 min-w-[90px] justify-between"
      style={{ letterSpacing: "0.5px" }}
      onClick={() => setShowDisplayDropdown(v => !v)}
    >
      <span className="flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
        Display
      </span>
      <ChevronDown className="w-4 h-4 text-white ml-2" />
    </button>

    {showDisplayDropdown && (
      <div className="absolute right-0 top-full mt-2 w-[416px] bg-[#18181b] border border-[#232323] rounded-2xl shadow-2xl z-50 flex flex-col p-0"
        style={{ maxHeight: 600, overflowY: "auto", minWidth: 416 }}>
        {/* --- Metrics --- */}
        <div className="pt-6 pb-1 px-6">
          <div className="text-[#bfcaff] text-[16.7px] font-medium mb-1.5 leading-5">Metrics</div>
          <div className="flex gap-3 mb-5">
            {metrics.map((m, idx) => (
              <button
                key={m.label}
                className={`rounded-[12px] border flex-1 flex flex-col items-center justify-center px-0 py-0 h-[70px] shadow transition-colors text-[19px] font-semibold
                ${m.active
                  ? "bg-[#23253a] text-white border-[#23253a] shadow-[0_0_0_2px_#23253a]"
                  : "bg-transparent text-[#bfcaff] border-[#23253a]"
                }`}
                style={{ height: 70 }}
              >
                <span className="block leading-[1.3]">{m.value}</span>
                <span className={`block mt-[6px] text-[15.6px] leading-[15px] ${m.active ? "text-[#bfcaff]" : ""}`}>
                  {m.label}
                </span>
              </button>
            ))}
          </div>
          {/* --- Quick Buy --- */}
          <div className="text-[#bfcaff] text-[16.7px] font-medium mb-2 leading-5">Quick Buy</div>
          <div className="flex gap-3 mb-3">
            {quickBuy.map(({ label, active, disabled }, i) => (
              <button
                key={label}
                disabled={disabled}
                className={`relative text-[#6c8cff] font-semibold rounded-[10px] w-1/4 px-0 py-0 h-[61px] 
                border border-[#23253a] flex flex-col items-center justify-center shadow-[0_0_0_2px_#23253a] 
                ${active ? "bg-[#23253a]" : "bg-[#23253a] opacity-70"}
                ${disabled ? "cursor-not-allowed opacity-50" : ""}
                `}
                style={{ height: 61, minWidth: 80 }}
              >
                <span className="block font-bold text-[15.5px] mb-1.5" style={{lineHeight:1.2}}>⚡7</span>
                <span className="text-[16px]" style={{marginTop:0}}>{label}</span>
              </button>
            ))}
          </div>
          {/* --- Theme --- */}
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-2 text-[20.5px]">
              <span role="img" aria-label="sun" className=" text-[#bfcaff]">☀️</span>
              <span className="text-[#bfcaff] font-medium text-[18.5px] tracking-[-0.3px]">Grey</span>
            </span>
          </div>
        </div>
        <div className="border-t border-[#23253a] mx-6" />
        {/* --- Options --- */}
        <div className="py-6 px-6">
          <div className="flex flex-col gap-6.5">
            {options.map((o, idx) => (
              <label
                key={o.label}
                className="flex items-center gap-3 cursor-pointer group text-[#bfcaff] text-[16.7px] font-medium"
                style={{minHeight:35}}
              >
                <span className="flex items-center text-[20px] mr-1">{o.icon}</span>
                <span className="flex-1">{o.label}</span>
                <input type="checkbox" tabIndex={-1} checked={false} readOnly
                  className="appearance-none w-[18px] h-[18px] border-2 border-[#38396f] rounded-[6px] bg-[#15152c] ml-auto
                    relative transition-all outline-none checked:bg-[#445bff] checked:border-[#445bff]
                  "
                  style={{
                    boxShadow: '0 0 0 1.5px #2a2a2a',
                    accentColor: '#445bff'
                  }}
                />
              </label>
            ))}
          </div>
        </div>
        <div className="border-t border-[#23253a] mx-6" />
        {/* --- Customize Rows --- */}
        <div className="py-6 px-6">
          <div className="text-[#bfcaff] text-[16.7px] font-medium mb-2">Customize rows</div>
          <div className="flex flex-wrap gap-3">
            {rows.map(row => (
              <span
                key={row}
                className="bg-[#23253a] text-[#bfcaff] px-[17px] py-[7.7px] rounded-[12px] text-[15.7px] font-semibold shadow-[0_0_0_2px_#23253a] leading-[1.15] whitespace-nowrap"
                style={{
                  boxShadow: "0 0 0 2px #23253a",
                  marginBottom: 2,
                }}
              >
                {row}
              </span>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
);

export default DisplayDropdown;
