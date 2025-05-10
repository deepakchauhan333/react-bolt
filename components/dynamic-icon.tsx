'use client'

import { MicIcon as icons } from 'lucide-react'

export const iconList = Object.keys(icons)

export function dynamicIconImport(iconName: string) {
  const normalizedIconName = iconName.charAt(0).toUpperCase() + iconName.slice(1)
  
  if (normalizedIconName in icons) {
    return icons[normalizedIconName as keyof typeof icons]
  }
  
  // Default to a sparkles icon if not found
  return icons.Sparkles
}