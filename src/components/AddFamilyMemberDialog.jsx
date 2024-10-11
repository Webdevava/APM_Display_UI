import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { User, Calendar, Users } from "lucide-react"
import { OnScreenKeyboard } from "./OnScreenKeyboard"
// import { OnScreenKeyboard } from "./on-screen-keyboard"


export default function AddFamilyMemberDrawer({
  isOpen,
  onOpenChange,
  onSave,
  editingMember,
}) {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [activeInput, setActiveInput] = useState(null)

  useEffect(() => {
    if (editingMember) {
      setName(editingMember.name)
      setAge(editingMember.age.toString())
      setGender(editingMember.gender)
    } else {
      setName("")
      setAge("")
      setGender("")
    }
  }, [editingMember])

  const handleSave = () => {
    if (name && age && gender) {
      onSave({ name, age: parseInt(age), gender })
    }
  }

  const handleKeyPress = (key) => {
    if (key === "backspace") {
      if (activeInput === "name") {
        setName((prev) => prev.slice(0, -1))
      } else if (activeInput === "age") {
        setAge((prev) => prev.slice(0, -1))
      }
    } else {
      if (activeInput === "name") {
        setName((prev) => prev + key)
      } else if (activeInput === "age") {
        setAge((prev) => prev + key)
      }
    }
  }

  const handleInputFocus = (inputName) => {
    setActiveInput(inputName)
  }

  const handleCloseKeyboard = () => {
    setActiveInput(null)
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            {editingMember ? "Edit Family Member" : "Add Family Member"}
          </DrawerTitle>
          <DrawerDescription>
            Fill in the details of the family member below.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pb-0">
          <div className="grid gap-6">
            <div className="flex items-center gap-4">
              <User className="h-6 w-6 text-muted-foreground" />
              <div className="grid w-full gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => handleInputFocus("name")}
                  placeholder="Enter name"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Calendar className="h-6 w-6 text-muted-foreground" />
              <div className="grid w-full gap-1.5">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  onFocus={() => handleInputFocus("age")}
                  placeholder="Enter age"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Users className="h-6 w-6 text-muted-foreground" />
              <div className="grid w-full gap-1.5">
                <Label htmlFor="gender">Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button onClick={handleSave}>Save changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
        {activeInput && (
          <OnScreenKeyboard
            type={activeInput === "age" ? "number" : "text"}
            onKeyPress={handleKeyPress}
            onClose={handleCloseKeyboard}
          />
        )}
      </DrawerContent>
    </Drawer>
  )
}