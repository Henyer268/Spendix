import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://aatjgghvfxmprfufzoyj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhdGpnZ2h2ZnhtcHJmdWZ6b3lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5ODM5MjcsImV4cCI6MjA5NTU1OTkyN30.OYkTq488pSWXVaDaKscRppCpe5AaoWPZNvpovdla8WE'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)