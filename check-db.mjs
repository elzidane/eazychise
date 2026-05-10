import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://tnhwhxbhpkfxwkvftbha.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuaHdoeGJocGtmeHdrdmZ0YmhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNTU2NTQsImV4cCI6MjA5MzkzMTY1NH0.Pp7sVkQyO6d9s48-6iG8sYppzShJSKPM83jEWZ7ftUc";
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log("Checking if we can update franchises...");
  // We need to login as some user to try to update. Or try anon.
  const { data, error } = await supabase
    .from('franchises')
    .update({ name: "Kopi Studio 24" })
    .eq('name', 'Kopi Studio 24')
    .select();
    
  console.log("UPDATE result:", data);
  console.log("UPDATE error:", error);
}

check();
