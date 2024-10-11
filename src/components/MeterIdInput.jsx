import React from "react"
import { Input } from "@/components/ui/input"


export function MeterIdInput({ value, onChange }) {
  const handleChange = (e) => {
    const newValue = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "")
    onChange(newValue)
  }

  return (
    <Input
      value={value}
      onChange={handleChange}
      placeholder="Enter Meter ID"
      maxLength={10}
      className="text-center text-xl"
    />
  )
}