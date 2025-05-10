import { Suspense } from 'react'
import { CategoriesSection } from '@/components/categories-section'
import { CategoriesSkeleton } from '@/components/skeletons/categories-skeleton'

export const metadata = {
  title: 'Categories | AI Tools Directory',
  description: 'Browse AI tools by category',
}

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Browse by Category
        </h1>
        <p className="text-xl text-muted-foreground">
          Find AI tools organized by category to match your specific needs
        </p>
      </div>
      
      <Suspense fallback={<CategoriesSkeleton />}>
        <CategoriesSection />
      </Suspense>
    </div>
  )
}