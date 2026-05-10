import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://tnhwhxbhpkfxwkvftbha.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuaHdoeGJocGtmeHdrdmZ0YmhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNTU2NTQsImV4cCI6MjA5MzkzMTY1NH0.Pp7sVkQyO6d9s48-6iG8sYppzShJSKPM83jEWZ7ftUc";
const supabase = createClient(supabaseUrl, supabaseKey);

async function diagnose() {
  console.log("--- DIAGNOSTICS ---");
  
  // 1. Check all franchises and their owners
  const { data: franchises, error: fError } = await supabase.from('franchises').select('id, name, owner_id');
  if (fError) console.error("Error fetching franchises:", fError);
  else {
    console.log(`Found ${franchises.length} franchises.`);
    console.log("Ownership Mapping:", franchises.map(f => `${f.name}: ${f.owner_id}`));
  }

  // 2. Check all partnership_requests
  const { data: leads, error: lError } = await supabase.from('partnership_requests').select('*');
  if (lError) console.error("Error fetching leads:", lError);
  else {
    console.log(`Found ${leads.length} leads in database.`);
    leads.forEach((l, i) => {
      console.log(`Lead ${i+1}: From ${l.name} for Franchise ID ${l.franchise_id}`);
    });
  }

  // 3. Check current test lead status
  // We want to see if there's any lead that doesn't match a franchise owner
}

diagnose();
