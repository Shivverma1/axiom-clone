"use client"

import { memo } from "react"
import { Star, TrendingUp } from "lucide-react"
import { Button } from "./ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip"

export const SecondaryNav = memo(() => {
  return (
    <TooltipProvider delayDuration={0}>
      <div
        className="flex items-center px-2 sm:px-3 lg:px-4 py-1 bg-[#0a0a0a] border-b border-gray-800 min-h-[28px] sm:min-h-[34px] max-h-[36px] sm:max-h-[42px]"
        style={{
          width: '100%',
          maxWidth: '100vw'
        }}
      >
        <div className="flex items-center space-x-1 min-w-0 flex-shrink-0">
          {/* === Watchlist === */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-5 h-5 sm:w-6 sm:h-6 lg:w-6.5 lg:h-6.5 text-gray-300 rounded transition-transform duration-100 hover:scale-110"
              >
                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2]" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Watchlist
            </TooltipContent>
          </Tooltip>

          {/* === Active Positions === */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-5 h-5 sm:w-6 sm:h-6 lg:w-6.5 lg:h-6.5 text-gray-300 rounded transition-transform duration-100 hover:scale-110"
              >
                <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2]" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Active Positions
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
})

SecondaryNav.displayName = "SecondaryNav"
