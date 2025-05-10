import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface ToolsSkeletonProps {
  count?: number
  featured?: boolean
}

export function ToolsSkeleton({ count = 6, featured = false }: ToolsSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="relative h-48">
            <Skeleton className="absolute inset-0" />
            {featured && (
              <div className="absolute top-3 left-3 z-10">
                <Skeleton className="h-5 w-20" />
              </div>
            )}
          </div>
          
          <CardContent className="p-5">
            <Skeleton className="h-6 w-3/4 mb-4" />
            
            <div className="flex mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-4 rounded-full mr-1" />
              ))}
              <Skeleton className="h-4 w-8 ml-1" />
            </div>
            
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-4" />
            
            <div className="flex justify-between">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          </CardContent>
          
          <CardFooter className="px-5 pb-5 pt-0 flex justify-between gap-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-10" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}