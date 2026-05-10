import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://tnhwhxbhpkfxwkvftbha.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuaHdoeGJocGtmeHdrdmZ0YmhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNTU2NTQsImV4cCI6MjA5MzkzMTY1NH0.Pp7sVkQyO6d9s48-6iG8sYppzShJSKPM83jEWZ7ftUc";
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase
    .from('franchises')
    .insert({
      name: "Test",
      cat: "Test",
      cat_key: "test",
      img: "test.jpg",
      invest_text: "Rp 10 Juta",
      city: "Jakarta",
      owner_id: "00000000-0000-0000-0000-000000000000"
    })
    .select();
  console.log("INSERT ERROR:", error);
}

check();
