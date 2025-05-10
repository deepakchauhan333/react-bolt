import { Suspense } from 'react';
import { ToolsGrid } from '@/components/tools-grid';
import { CategoriesSection } from '@/components/categories-section';
import { Hero } from '@/components/hero';
import { FeaturedTools } from '@/components/featured-tools';
import { SearchBar } from '@/components/search-bar';
import { ToolsSkeleton } from '@/components/skeletons/tools-skeleton';
import { CategoriesSkeleton } from '@/components/skeletons/categories-skeleton';
import { getTools } from '@/lib/supabase';  // Importing getTools function

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <section className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured AI Tools</h2>
              <p className="text-muted-foreground mt-2">
                Explore trending and innovative AI tools that are making waves
              </p>
            </div>
            <SearchBar className="w-full md:w-72" />
          </div>
          
          <Suspense fallback={<ToolsSkeleton count={3} featured />}>
            <FeaturedTools />
          </Suspense>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">
            Browse AI tools by category to find exactly what you need
          </p>
          
          <Suspense fallback={<CategoriesSkeleton />}>
            <CategoriesSection />
          </Suspense>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">All AI Tools</h2>
          <p className="text-muted-foreground">
            Discover our comprehensive collection of AI tools to enhance your workflow
          </p>
          
          <Suspense fallback={<ToolsSkeleton count={9} />}>
            <ToolsGrid />
          </Suspense>
        </section>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const tools = await getTools();  // Fetch tools data here from the database
  return tools.map((tool) => ({
    id: tool.id.toString(),  // Ensure id is converted to a string
  }));
}
