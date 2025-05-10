import { getFeaturedTools } from '@/lib/supabase'
import { ToolCard } from '@/components/tool-card'

export async function FeaturedTools() {
  const featuredTools = await getFeaturedTools()
  
  if (!featuredTools.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No featured tools available at the moment.</p>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredTools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} featured />
      ))}
    </div>
  )
}