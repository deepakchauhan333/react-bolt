'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { cn, getCategoryIcon } from '@/lib/utils'
import { dynamicIconImport } from '@/components/dynamic-icon'
import { type Category } from '@/lib/supabase'

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const iconName = category.icon || getCategoryIcon(category.name)
  const Icon = dynamicIconImport(iconName)
  
  return (
    <Link href={`/categories/${category.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card className={cn(
          "h-full transition-all duration-300 text-center",
          "hover:shadow-md hover:border-primary/30",
          isHovered && "bg-accent/50"
        )}>
          <CardContent className="p-4 flex flex-col items-center">
            <div className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center mb-3 mt-3",
              "bg-primary/10 text-primary",
              "transition-all duration-300",
              isHovered && "bg-primary/20"
            )}>
              {Icon && <Icon className="w-6 h-6" />}
            </div>
            
            <h3 className="font-medium text-sm">
              {category.name}
            </h3>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}