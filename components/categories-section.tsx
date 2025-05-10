import { getCategories } from '@/lib/supabase'
import { CategoryCard } from '@/components/category-card'

export async function CategoriesSection() {
  const categories = await getCategories()
  
  if (!categories.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No categories available at the moment.</p>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  )
}