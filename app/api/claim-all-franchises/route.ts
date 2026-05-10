import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = await createClient();
  
  // Ambil user yang sedang login saat ini
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Anda belum login. Silakan login terlebih dahulu." }, { status: 401 });
  }

  // Update semua franchise agar dimiliki oleh user yang sedang login
  const { data, error } = await supabase
    .from('franchises')
    .update({ owner_id: user.id })
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Dummy condition to update all rows

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ 
    message: "SUKSES! Semua franchise sekarang adalah milik Anda.", 
    user_id: user.id,
    email: user.email
  });
}
