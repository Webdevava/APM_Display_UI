import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings, Network, RefreshCw, Info } from "lucide-react";

export default function SettingsDialog({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-6 w-6" />
            Settings
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <Button variant="outline" className="w-full justify-start" size="lg">
            <Network className="mr-2 h-4 w-4" />
            Network Configuration
          </Button>
          <Button variant="outline" className="w-full justify-start" size="lg">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reboot Device
          </Button>
          <Button variant="outline" className="w-full justify-start" size="lg">
            <Info className="mr-2 h-4 w-4" />
            Device Information
          </Button>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
