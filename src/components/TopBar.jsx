"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Clock } from "lucide-react";

export default function TopBar() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-between items-center p-3 bg-secondary">
      <div className="flex items-center space-x-2">
        <Image
          src="/inditronics-logo.png"
          alt="Inditronics Logo"
          width={32}
          height={32}
          className="rounded-sm"
        />
        <span className="font-semibold text-lg">Inditronics</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-lg font-medium">
          {currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
