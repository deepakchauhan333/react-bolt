import { getTools } from '@/lib/supabase'
import { ToolCard } from '@/components/tool-card'

export async function ToolsGrid() {
  const tools = await getTools()
  
  if (!tools.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No tools available at the moment.</p>
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