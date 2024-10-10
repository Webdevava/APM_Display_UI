import React, { useState, useEffect, useRef } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { User, Calendar, Users } from "lucide-react";

export default function FullScreenFamilyMemberDialog({
  isOpen,
  onClose,
  onSave,
  editingMember,
}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeInput, setActiveInput] = useState("");
  const keyboardRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    if (editingMember) {
      setName(editingMember.name);
      setAge(editingMember.age.toString());
      setGender(editingMember.gender);
    } else {
      setName("");
      setAge("");
      setGender("");
    }
  }, [editingMember]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowKeyboard(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSave = () => {
    if (name && age && gender) {
      onSave({ name, age: parseInt(age), gender });
      onClose();
    }
  };

  const handleInputFocus = (inputName) => {
    setShowKeyboard(true);
    setActiveInput(inputName);
  };

  const handleInputChange = (input) => {
    if (activeInput === "name") {
      setName(input);
    } else if (activeInput === "age") {
      setAge(input);
    }
  };

  const onKeyPress = (button) => {
    if (button === "{enter}") {
      setShowKeyboard(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[700px] h-[100%] p-0 flex flex-col"
        ref={containerRef}
      >
        <DialogHeader className="p-6 bg-background border-b">
          <DialogTitle className="flex items-center gap-2 text-lg h-0">
            <Users className="h-8 w-8" />
            {editingMember ? "Edit Family Member" : "Add Family Member"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto p-4">
          <div className="grid gap-6">
            <div className="flex items-center gap-4">
              <User className="h-6 w-6 text-muted-foreground" />
              <div className="grid w-full gap-1.5">
                <Label htmlFor="name" className="text-lg">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => handleInputFocus("name")}
                  placeholder="Enter name"
                  className="text-lg p-3"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Calendar className="h-6 w-6 text-muted-foreground" />
              <div className="grid w-full gap-1.5">
                <Label htmlFor="age" className="text-lg">
                  Age
                </Label>
                <Input
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  onFocus={() => handleInputFocus("age")}
                  placeholder="Enter age"
                  className="text-lg p-3"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Users className="h-6 w-6 text-muted-foreground" />
              <div className="grid w-full gap-1.5">
                <Label htmlFor="gender" className="text-lg">
                  Gender
                </Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="text-lg p-3">
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
        {showKeyboard && (
          <div className="w-full bg-background border-t p-0">
            <Keyboard
              keyboardRef={(r) => (keyboardRef.current = r)}
              layoutName="default"
              onChange={handleInputChange}
              onKeyPress={onKeyPress}
            />
          </div>
        )}
        <DialogFooter className="p-2 bg-background border-t">
          <Button onClick={onClose} variant="outline" className="mr-2">
            Cancel
          </Button>
          <Button onClick={handleSave} type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
