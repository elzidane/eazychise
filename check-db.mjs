import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://tnhwhxbhpkfxwkvftbha.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuaHdoeGJocGtmeHdrdmZ0YmhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNTU2NTQsImV4cCI6MjA5MzkzMTY1NH0.Pp7sVkQyO6d9s48-6iG8sYppzShJSKPM83jEWZ7ftUc";
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log("Fetching a franchise id...");
  const { data: franchises } = await supabase.from('franchises').select('id').limit(1);
  const fId = franchises[0].id;

  console.log("Inserting dummy lead without select()...");
  const { error } = await supabase.from('partnership_requests').insert({
    franchise_id: fId,
    name: "Test Lead",
    email: "test@example.com",
    phone: "08123456789",
    location: "Jakarta",
    message: "This is a test lead from script",
    status: "Baru"
  });

  if (error) {
    console.error("ERROR INSERTING:", error);
  } else {
    console.log("SUCCESS INSERTING!");
  }
}

check();
