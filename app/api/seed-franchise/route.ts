import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { FRANCHISE_DATA } from '@/lib/franchise-data';

export async function GET() {
  const supabase = await createClient();
  
  // Ambil user saat ini untuk dijadikan 'owner' dari data yang disalin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized. Silakan login ke akun EazyChise Anda terlebih dahulu di tab lain, lalu refresh halaman ini." }, { status: 401 });
  }

  // Cek apakah data sudah ada agar tidak duplikat
  const { data: existing } = await supabase.from('franchises').select('id').limit(1);
  if (existing && existing.length > 0) {
    return NextResponse.json({ message: "Data sudah dipindahkan sebelumnya. Tidak perlu seeding ulang!" });
  }

  // Format data agar sesuai dengan skema database
  const franchisesToInsert = FRANCHISE_DATA.map(f => ({
    owner_id: user.id,
    name: f.name,
    cat: f.cat,
    cat_key: f.catKey,
    city: f.city,
    rating: f.rating,
    invest_text: f.invest,
    invest_num: f.investNum,
    roi: f.roi,
    omzet: f.omzet,
    mitra_count: f.mitra,
    badge: f.badge || null,
    badge_color: f.badgeColor || null,
    img: f.img
  }));

  // Masukkan ke Supabase
  const { data, error } = await supabase.from('franchises').insert(franchisesToInsert).select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ 
    message: "SUKSES! Berhasil menyalin data lokal ke database Supabase.", 
    total_data_dipindah: data?.length 
  });
}
