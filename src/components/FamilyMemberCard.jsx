"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

const getAgeGroup = (age) => {
  if (age < 13) return "child";
  if (age < 20) return "teen";
  if (age < 60) return "adult";
  if (age < 80) return "senior";
  return "old";
};

const getImageUrl = (ageGroup, gender) => {
  if (gender === "Other") {
    return "/transgender.png";
  }
  return `/${ageGroup}_${gender}.svg`;
};

export default function FamilyMemberCard({
  member,
  onAdd,
  onEdit,
  onDelete,
  onToggleActive,
}) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  if (!member) {
    return (
      <Card
        className="flex items-center justify-center cursor-pointer h-40 hover:bg-accent transition-colors duration-200"
        onClick={onAdd}
      >
        <CardContent className="p-6 text-center">
          <Plus className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
          <p className="text-lg font-medium">Add a Family Member</p>
        </CardContent>
      </Card>
    );
  }

  const handleCardClick = (e) => {
    if (!e.target.closest("button")) {
      onToggleActive();
    }
  };

  const ageGroup = getAgeGroup(member.age);
  const imageUrl = getImageUrl(ageGroup, member.gender);

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
      <Card
        className={`h-40 p-0 flex flex-col justify-between cursor-pointer transition-all duration-200 overflow-hidden relative ${
          !member.active ? "grayscale" : ""
        }`}
        onClick={handleCardClick}
        style={{
          backgroundImage: `url(${imageUrl})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
          backgroundRepeat:"no-repeat"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <CardHeader className="p-2 relative z-10">
          <CardTitle className="flex justify-between items-center text-foreground">
            {member.name}
            <Badge
              variant={member.active ? "success" : "secondary"}
              className={
                member.active
                  ? "bg-green-300 border-green-500"
                  : "bg-secondary border-foreground/50"
              }
            >
              {member.active ? "Active" : "Inactive"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardFooter className="justify-end space-x-2 pb-2 pr-2 w-full relative z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setIsDeleteDialogOpen(true);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Family Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {member.name}? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete();
                setIsDeleteDialogOpen(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
