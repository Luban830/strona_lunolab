import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

export interface Project {
  id: string
  slug: string
  title: string
  description: string
  content: string | null
  content_image_1: string | null
  content_bottom: string | null
  content_image_2: string | null
  image_url: string | null
  client_name: string
  category: string
  technologies: string[] | null
  sort_order?: number
  created_at: string
}
