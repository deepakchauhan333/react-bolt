'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import { ToolCard } from '@/components/tool-card'
import { SearchBar } from '@/components/search-bar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { searchTools } from '@/lib/supabase'
import { ToolsSkeleton } from '@/components/skeletons/tools-skeleton'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function fetchResults() {
      if (query.trim()) {
        setLoading(true)
        try {
          const data = await searchTools(query)
          setResults(data)
        } catch (error) {
          console.error('Error searching tools:', error)
          setResults([])
        } finally {
          setLoading(false)
        }
      } else {
        setResults([])
        setLoading(false)
      }
    }
    
    fetchResults()
  }, [query])
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Search Results
        </h1>
        {query && (
          <p className="text-xl text-muted-foreground">
            Showing results for "{query}"
          </p>
        )}
      </div>
      
      <div className="max-w-xl mx-auto mb-10">
        <SearchBar className="w-full" />
      </div>
      
      {loading ? (
        <ToolsSkeleton count={6} />
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No results found</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            We couldn't find any AI tools matching your search. Try using different keywords or browse our categories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/tools">
                Browse all tools
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/categories">
                View categories
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}