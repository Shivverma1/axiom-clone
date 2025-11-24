import React from "react";
import { Search } from "lucide-react";

const SearchBar: React.FC = () => (
  <div className="relative hidden sm:block w-[180px] md:w-[220px] lg:w-[240px]">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
    <input
      type="text"
      placeholder="Search by token or CA..."
      className="bg-[#191919] border border-gray-700 rounded-full pl-9 pr-6 py-[7.5px] text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 w-full"
    />
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-medium select-none">/</span>
  </div>
);

export default SearchBar;
