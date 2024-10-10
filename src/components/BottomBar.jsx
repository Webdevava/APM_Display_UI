import { Wifi, Signal, Settings, Battery } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function BottomBar({ onSettingsClick }) {
  return (
    <div className="flex justify-between  items-center px-3 bg-secondary">
      <div className="flex justify-between  items-center h-full space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Wifi className="h-5 w-5 text-green-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>WiFi Connected</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Signal className="h-5 w-5 text-green-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Strong Signal</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Battery className="h-5 w-5 text-green-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Battery Full</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onSettingsClick}
              className="hover:bg-primary/10"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open Settings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
