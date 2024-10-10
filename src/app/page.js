"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Onboarding from '@/components/Onboarding'
import TopBar from '@/components/TopBar'
import BottomBar from '@/components/BottomBar'
import FamilyMemberCard from '@/components/FamilyMemberCard'
import AddFamilyMemberDialog from '@/components/AddFamilyMemberDialog'
import SettingsDialog from '@/components/SettingsDialog'

export default function Home() {
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [familyMembers, setFamilyMembers] = useState([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [editingMember, setEditingMember] = useState(null)

  const handleAddMember = (member) => {
    setFamilyMembers([...familyMembers, { ...member, active: false }])
  }

  const handleEditMember = (index, member) => {
    const newMembers = [...familyMembers]
    newMembers[index] = { ...member, active: newMembers[index].active }
    setFamilyMembers(newMembers)
  }

  const handleDeleteMember = (index) => {
    setFamilyMembers(familyMembers.filter((_, i) => i !== index))
  }

  const handleToggleActive = (index) => {
    setFamilyMembers(familyMembers.map((member, i) => 
      i === index ? { ...member, active: !member.active } : member
    ))
  }

  if (onboardingStep < 5) {
    return <Onboarding currentStep={onboardingStep} onComplete={() => setOnboardingStep(5)} />
  }

  return (
    <motion.main 
      className="flex flex-col h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <TopBar />
      <motion.div 
        className="flex-grow grid grid-cols-4 grid-rows-2 gap-4 p-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnimatePresence>
          {[...Array(8)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <FamilyMemberCard
                member={familyMembers[index]}
                onAdd={() => {
                  setEditingMember(null)
                  setIsAddDialogOpen(true)
                }}
                onEdit={() => {
                  setEditingMember(index)
                  setIsAddDialogOpen(true)
                }}
                onDelete={() => handleDeleteMember(index)}
                onToggleActive={() => handleToggleActive(index)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <BottomBar onSettingsClick={() => setIsSettingsOpen(true)} />
      <AddFamilyMemberDialog
        isOpen={isAddDialogOpen}
        onClose={() => {
          setIsAddDialogOpen(false)
          setEditingMember(null)
        }}
        onSave={(member) => {
          if (editingMember !== null) {
            handleEditMember(editingMember, member)
          } else {
            handleAddMember(member)
          }
          setIsAddDialogOpen(false)
          setEditingMember(null)
        }}
        editingMember={editingMember !== null ? familyMembers[editingMember] : null}
      />
      <SettingsDialog isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </motion.main>
  )
}