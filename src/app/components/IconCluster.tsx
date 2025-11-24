import React from "react";
import { Star, Bell, User, ChevronDown, Wallet, DollarSign } from "lucide-react";

const IconCluster: React.FC = () => (
  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
    {/* Star */}
    <button className="p-1.5 sm:p-2.5 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors flex-shrink-0">
      <Star className="w-3 h-3 sm:w-4 sm:h-4" />
    </button>

    {/* Bell */}
    <button className="p-1.5 sm:p-2.5 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors flex-shrink-0">
      <Bell className="w-3 h-3 sm:w-4 sm:h-4" />
    </button>

    {/* Wallet Section */}
    <div className="flex items-center bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
      {/* Left: Wallet icon and first 0 */}
      <div className="px-2 sm:px-3 py-1.5 sm:py-2 flex items-center gap-1 sm:gap-2">
        <Wallet className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
        <span className="text-xs sm:text-sm font-medium text-white">0</span>
      </div>

      {/* Middle: DollarSign icon as separator */}
      <div className="border-l border-gray-700 h-4 sm:h-6 flex items-center px-1">
        <DollarSign className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-green-400" />
      </div>

      {/* Right: Circle with 0 and dropdown */}
      <div className="px-1.5 sm:px-2.5 py-1.5 sm:py-2 flex items-center gap-1 sm:gap-1.5">
        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">0</span>
        </div>
        <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400" />
      </div>
    </div>

    {/* User/Profile icon */}
    <button className="p-1.5 sm:p-2.5 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors flex-shrink-0">
      <User className="w-3 h-3 sm:w-4 sm:h-4" />
    </button>
  </div>
);

export default IconCluster;
