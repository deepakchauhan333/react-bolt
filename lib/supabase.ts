import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tool types
export type Tool = {
  id: string
  name: string
  description: string
  url: string
  image_url?: string
  category_id: string
  pricing?: string | { plan: string; price: number; features: string[] }
  rating?: number
  created_at: string
  updated_at?: string
  featured?: boolean
}

// Category types
export type Category = {
  id: string
  name: string
  description?: string
  slug: string
  icon?: string
  created_at: string
}

// Fetching functions
export async function getTools() {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching tools:', error)
    return []
  }
  
  return data as Tool[]
}

export async function getFeaturedTools() {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching featured tools:', error)
    return []
  }
  
  return data as Tool[]
}

export async function getToolsByCategory(categoryId: string) {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('category_id', categoryId)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching tools by category:', error)
    return []
  }
  
  return data as Tool[]
}

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })
  
  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }
  
  return data as Category[]
}

export async function getToolById(id: string) {
  console.log('Fetching tool with ID:', id) // Debug log
  
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching tool by ID:', error)
    return null
  }
  
  console.log('Tool data:', data) // Debug log
  return data as Tool
}

export async function getCategoryBySlug(slug: string) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) {
    console.error('Error fetching category by slug:', error)
    return null
  }
  
  return data as Category
}

export async function searchTools(query: string) {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error searching tools:', error)
    return []
  }
  
  return data as Tool[]
}