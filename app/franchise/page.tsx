import FranchiseListings from "@/components/features/FranchiseList";
import { createClient } from "@/utils/supabase/server";

async function getFranchises() {
  const supabase = await createClient();
  const { data } = await supabase.from('franchises').select('*');
  
  if (!data) return undefined;
  
  return data.map(f => ({
    id: f.id,
    name: f.name,
    cat: f.cat,
    catKey: f.cat_key,
    city: f.city,
    rating: f.rating,
    invest: f.invest_text,
    investNum: f.invest_num,
    roi: f.roi,
    omzet: f.omzet,
    mitra: f.mitra_count,
    badge: f.badge,
    badgeColor: f.badge_color,
    img: f.img
  }));
}

export default async function FranchisePage() {
  const franchises = await getFranchises();
  const safeData = franchises && franchises.length > 0 ? franchises : undefined;

  return (
    <main className="pt-20">
      <FranchiseListings initialData={safeData} />
    </main>
  );
}
