import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, ArrowUp, ArrowLeft, Space, Delete, ArrowBigUpDash } from "lucide-react"

export function OnScreenKeyboard({ type, onKeyPress, onClose }) {
  const [capsLock, setCapsLock] = useState(false)

  const handleCapsLockToggle = () => setCapsLock((prev) => !prev)

  const handleBackspace = () => onKeyPress("backspace")
  const handleSpace = () => onKeyPress(" ")

  const alphabetKeys = "qwertyuiopasdfghjklzxcvbnm".split("")
  const numberKeys = "1234567890".split("")

  const getKeyDisplay = (key) => (capsLock ? key.toUpperCase() : key)

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-2 shadow-lg">
      <div className="flex flex-wrap justify-center">
        {type === "text" && (
          <>
            {alphabetKeys.map((key) => (
              <Button
                key={key}
                variant="outline"
                className="m-1 w-[8.5%] h-12 text-lg"
                onClick={() => onKeyPress(getKeyDisplay(key))}
              >
                {getKeyDisplay(key)}
              </Button>
            ))}
            <Button
              variant="outline"
              className="m-1 w-[13%] h-12 text-lg"
              onClick={handleCapsLockToggle}
            >
              <ArrowBigUpDash className={`w-6 h-6 ${capsLock ? "text-primary" : ""}`} />
            </Button>
            <Button
              variant="outline"
              className="m-1 w-[13%] h-12 text-lg"
              onClick={handleSpace}
            >
              <Space className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              className="m-1 w-[13%] h-12 text-lg"
              onClick={handleBackspace}
            >
              <Delete className="w-6 h-6" />
            </Button>
          </>
        )}
        {type === "number" && (
          <>
            {numberKeys.map((key) => (
              <Button
                key={key}
                variant="outline"
                className="m-1 w-[18%] h-12 text-lg"
                onClick={() => onKeyPress(key)}
              >
                {key}
              </Button>
            ))}
            <Button
              variant="outline"
              className="m-1 w-[18%] h-12 text-lg"
              onClick={handleBackspace}
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </>
        )}
      </div>
      <Button
        variant="outline"
        className="absolute top-2 right-2"
        size="icon"
        onClick={onClose}
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  )
}