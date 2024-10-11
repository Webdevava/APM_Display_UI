import React, { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"


export function OtpInput({ value, onChange }) {
  const inputRefs = useRef([])

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6)
  }, [])

  const handleChange = (index, digit) => {
    if (/^\d*$/.test(digit) && digit.length <= 1) {
      const newValue = [...value]
      newValue[index] = digit
      onChange(newValue)

      if (digit !== "" && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && value[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="flex justify-between">
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <Input
          key={index}
          type="text"
          maxLength={1}
          value={value[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          ref={(el) => (inputRefs.current[index] = el)}
          className="w-12 h-12 text-center text-2xl"
        />
      ))}
    </div>
  )
}