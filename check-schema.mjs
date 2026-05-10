import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://tnhwhxbhpkfxwkvftbha.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuaHdoeGJocGtmeHdrdmZ0YmhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNTU2NTQsImV4cCI6MjA5MzkzMTY1NH0.Pp7sVkQyO6d9s48-6iG8sYppzShJSKPM83jEWZ7ftUc";
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.rpc('get_schema');
  // or just select 1 row
  const { data: row } = await supabase.from('franchises').select('*').limit(1);
  console.log("COLUMNS:", Object.keys(row[0]));
}

check();
