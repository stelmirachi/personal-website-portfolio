import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || ''

// 1. Public Client: Safe to use in the browser (respects Row Level Security)
export const supabase = createClient(supabaseUrl, supabasePublishableKey)

// 2. Admin Client: Only use this inside /api/ routes! (Bypasses Row Level Security)
export const supabaseAdmin = createClient(supabaseUrl, supabaseSecretKey)
