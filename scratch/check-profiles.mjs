import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://tnhwhxbhpkfxwkvftbha.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuaHdoeGJocGtmeHdrdmZ0YmhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNTU2NTQsImV4cCI6MjA5MzkzMTY1NH0.Pp7sVkQyO6d9s48-6iG8sYppzShJSKPM83jEWZ7ftUc";
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .limit(1);
  
  if (error) {
    console.log("Profiles table error (likely doesn't exist):", error.message);
  } else {
    console.log("Profiles table exists!");
    if (data && data.length > 0) {
      console.log("Columns:", Object.keys(data[0]));
    } else {
      console.log("Profiles table is empty, but it exists.");
    }
  }
}

check();
