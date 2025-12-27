import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

export interface Project {
  id: string
  title: string
  description: string
  image_url: string
  client_name: string
  category: string
  created_at: string
}

