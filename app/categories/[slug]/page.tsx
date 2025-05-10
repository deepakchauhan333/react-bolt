import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { getCategoryBySlug, getToolsByCategory } from '@/lib/supabase'
import { ToolCard } from '@/components/tool-card'
import { ToolsSkeleton } from '@/components/skeletons/tools-skeleton'
import { getCategoryIcon } from '@/lib/utils'
import { dynamicIconImport } from '@/components/dynamic-icon'
import { ArrowLeft } from 'lucide-react'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug)
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }
  
  return {
    title: `${category.name} | AI Tools`,
    description: category.description || `Browse AI tools in the ${category.name} category`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug)
  
  if (!category) {
    notFound()
  }
  
  const iconName = category.icon || getCategoryIcon(category.name)
  const Icon = dynamicIconImport(iconName)
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="gap-1">
          <Link href="/categories">
            <ArrowLeft className="h-4 w-4" />
            Back to categories
          </Link>
        </Button>
      </div>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          {Icon && <Icon className="w-6 h-6" />}
        </div>
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
          {category.description && (
            <p className="text-muted-foreground mt-1">{category.description}</p>
          )}
        </div>
      </div>
      
      <Suspense fallback={<ToolsSkeleton count={9} />}>
        <CategoryTools slug={params.slug} />
      </Suspense>
    </div>
  )
}

async function CategoryTools({ slug }: { slug: string }) {
  const category = await getCategoryBySlug(slug)
  
  if (!category) {
    return null
  }
  
  const tools = await getToolsByCategory(category.id)
  
  if (!tools.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">
          No tools found in this category yet.
        </p>
        <Button asChild>
          <Link href="/tools">
            Browse all tools
          </Link>
        </Button>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  )
}