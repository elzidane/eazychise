import React from "react";
import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import FranchiseDetailContent from "./FranchiseDetailContent";
import { DbFranchise, DbReview } from "@/types";
import { toSlug } from "@/lib/utils/slugify";
import { FRANCHISE_DATA } from "@/lib/franchise-data";

interface Props {
  params: Promise<{ id: string }>;
}

async function getFranchiseData(slug: string) {
  const supabase = await createClient();
  
  // Efficient query: Select only needed fields
  const { data: franchises } = await supabase
    .from('franchises')
    .select('id, name, cat, cat_key, city, rating, invest_text, invest_num, roi, omzet, mitra_count, badge, badge_color, img');

  const decodedSlug = decodeURIComponent(slug);
  
  // Use the robust toSlug utility for matching to ensure consistency
  let f = (franchises as DbFranchise[] || []).find(item => {
    const brandSlug = toSlug(item.name);
    return brandSlug === decodedSlug || brandSlug === slug;
  });

  // Robust Fallback: check static local data if not found in database
  if (!f) {
    const localF = FRANCHISE_DATA.find(item => {
      const brandSlug = toSlug(item.name);
      return brandSlug === decodedSlug || brandSlug === slug;
    });

    if (localF) {
      f = {
        id: "local-" + toSlug(localF.name),
        name: localF.name,
        cat: localF.cat,
        cat_key: localF.catKey,
        city: localF.city,
        rating: localF.rating,
        invest_text: localF.invest,
        invest_num: localF.investNum,
        roi: localF.roi,
        omzet: localF.omzet,
        mitra_count: localF.mitra,
        badge: localF.badge || null,
        badge_color: localF.badgeColor || null,
        img: localF.img
      } as any;
    }
  }

  if (!f) return null;

  // Fetch reviews for this specific franchise
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('franchise_id', f.id)
    .order('created_at', { ascending: false });

  return {
    franchise: {
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
    },
    reviews: (reviews as DbReview[]) || []
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const data = await getFranchiseData(id);

  if (!data) {
    return {
      title: "Franchise Tidak Ditemukan | EazyChise",
    };
  }

  return {
    title: `${data.franchise.name} - Info Franchise & Kemitraan | EazyChise`,
    description: `Pelajari peluang bisnis franchise ${data.franchise.name} di ${data.franchise.city}. Modal ${data.franchise.invest}, ROI ${data.franchise.roi}. Daftar sekarang di EazyChise!`,
    openGraph: {
      title: `${data.franchise.name} | EazyChise`,
      description: `Investasi franchise ${data.franchise.name} mulai dari ${data.franchise.invest}.`,
      images: [data.franchise.img || ""],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const data = await getFranchiseData(id);

  if (!data) {
    notFound();
  }

  return <FranchiseDetailContent initialFranchise={data.franchise} initialReviews={data.reviews} />;
}
