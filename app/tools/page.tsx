import { Suspense } from 'react'
import { ToolsGrid } from '@/components/tools-grid'
import { SearchBar } from '@/components/search-bar'
import { ToolsSkeleton } from '@/components/skeletons/tools-skeleton'

export const metadata = {
  title: 'All AI Tools',
  description: 'Browse our comprehensive collection of AI tools',
}

export default function ToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          All AI Tools
        </h1>
        <p className="text-xl text-muted-foreground">
          Browse our comprehensive collection of AI tools to enhance your workflow
        </p>
      </div>
      
      <div className="max-w-xl mx-auto mb-10">
        <SearchBar className="w-full" />
      </div>
      
      <Suspense fallback={<ToolsSkeleton count={12} />}>
        <ToolsGrid />
      </Suspense>
    </div>
  )
}