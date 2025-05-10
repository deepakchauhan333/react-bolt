'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  className?: string
}

export function SearchBar({ className }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const router = useRouter()
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }
  
  const clearSearch = () => {
    setQuery('')
  }
  
  return (
    <form 
      onSubmit={handleSearch} 
      className={cn(
        "relative flex items-center w-full transition-all duration-300",
        isFocused && "scale-[1.01]",
        className
      )}
    >
      <div className="relative w-full">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search AI tools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "pl-9 pr-9 py-5 h-10 w-full rounded-full",
            "border-muted bg-background/60",
            "backdrop-blur-sm",
            "focus-visible:ring-1 focus-visible:ring-primary"
          )}
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute right-1.5 top-1.5 h-7 w-7 p-0"
          >
            <X className="h-3.5 w-3.5" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
    </form>
  )
}