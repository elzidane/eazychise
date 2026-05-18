"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, X, User as UserIcon, LayoutDashboard, LogOut, ChevronDown, Bell } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";
import { getUser, logout, User, syncSessionWithLocal } from "@/lib/auth";
import { Notification } from "@/types";
import { STATS } from "@/lib/constants";
import Image from "next/image";
import { RealtimeChannel } from "@supabase/supabase-js";

const links = [
  { href: "/",             label: "Beranda" },
  { href: "/cara-kerja",   label: "Cara Kerja" },
  { href: "/unggulan",     label: "Unggulan" },
  { href: "/franchise",    label: "Franchise" },
  { href: "/analisis-bep", label: "Analisis BEP" },
  { href: "/tentang",      label: "Tentang Kami" },
  { href: "/ulasan",       label: "Ulasan" },
];

export default function Navbar() {
  const supabase = createClient();
  const [session, setSession] = useState<Session | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Check auth state from Supabase and local
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: currentSession } }: { data: { session: Session | null } }) => {
      setSession(currentSession);
      if (currentSession?.user) {
        // Set initial state from session metadata instantly
        const initialName = currentSession.user.user_metadata?.full_name || currentSession.user.email;
        const initialImage = currentSession.user.user_metadata?.avatar_url;
        const syncedUser = syncSessionWithLocal({
          name: initialName,
          email: currentSession.user.email,
          image: initialImage,
        });
        setUser(syncedUser);

        // Fetch source of truth asynchronously outside the lock
        setTimeout(async () => {
          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('full_name, avatar_url')
              .eq('id', currentSession.user.id)
              .single();

            if (profile) {
              const name = profile.full_name || initialName;
              const image = profile.avatar_url || initialImage;
              setUser(syncSessionWithLocal({ name, email: currentSession.user.email, image }));
            }
          } catch (err) {
            console.error("Error fetching profile in getSession:", err);
          }
        }, 0);
      } else {
        setUser(getUser());
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        // Set initial state from session metadata instantly
        const initialName = session.user.user_metadata?.full_name || session.user.email;
        const initialImage = session.user.user_metadata?.avatar_url;
        const syncedUser = syncSessionWithLocal({
          name: initialName,
          email: session.user.email,
          image: initialImage,
        });
        setUser(syncedUser);

        // Fetch source of truth asynchronously outside the lock
        setTimeout(async () => {
          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('full_name, avatar_url')
              .eq('id', session.user.id)
              .single();

            if (profile) {
              const name = profile.full_name || initialName;
              const image = profile.avatar_url || initialImage;
              setUser(syncSessionWithLocal({ name, email: session.user.email, image }));
            }
          } catch (err) {
            console.error("Error fetching profile in onAuthStateChange:", err);
          }
        }, 0);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, supabase.auth]);

  // Fetch Notifications & Setup Realtime
  useEffect(() => {
    let channel: RealtimeChannel | null = null;

    const setupNotifications = async () => {
      if (session?.user) {
        // Fetch awal matching user_id OR email
        const { data } = await supabase
          .from('notifications')
          .select('*')
          .or(`user_id.eq.${session.user.id},email.eq.${session.user.email}`)
          .eq('is_read', false)
          .order('created_at', { ascending: false });
        if (data) setNotifications(data);

        // Realtime Subscription
        // Gunakan nama channel unik per user agar tidak bentrok dengan Strict Mode atau koneksi sebelumnya
        const channelName = `notifications-${session.user.id}-${Date.now()}`;
        channel = supabase
          .channel(channelName)
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'notifications',
              filter: `user_id=eq.${session.user.id}`
            },
            (payload: { new: Notification }) => {
              const newNotification = payload.new;
              setNotifications((prev) => [newNotification, ...prev]);
            }
          )
          .subscribe();
      }
    };

    setupNotifications();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [session, supabase]);

  const markNotificationsAsRead = async () => {
    if (!session?.user) return;
    await supabase.from('notifications').update({ is_read: true }).or(`user_id.eq.${session.user.id},email.eq.${session.user.email}`);
    setNotifications([]);
  };

  const handleNotificationClick = async (notification: Notification) => {
    // Mark as read
    await supabase.from('notifications').update({ is_read: true }).eq('id', notification.id);
    setNotifications(prev => prev.filter(n => n.id !== notification.id));

    // Handle navigation
    if (notification.type === 'lead' && notification.metadata?.lead_id) {
      router.push(`/dashboard?leadId=${notification.metadata.lead_id}`);
    } else if ((notification.type === 'update' || notification.type === 'success') && notification.metadata?.lead_id) {
      router.push(`/dashboard?myFranchiseId=${notification.metadata.lead_id}`);
    }
    setShowNotifications(false);
  };

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getUser());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (menuOpen) document.body.classList.add("nav-menu-open");
    else document.body.classList.remove("nav-menu-open");
    return () => { 
      document.body.style.overflow = ""; 
      document.body.classList.remove("nav-menu-open");
    };
  }, [menuOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    logout();
    setUser(null);
    setDropdownOpen(false);
    setMenuOpen(false);
    router.push("/");
  };

  // Hide Navbar on Login and Register pages
  if (pathname === "/masuk" || pathname === "/daftar") {
    return null;
  }

  return (
    <>
      
      <div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none"
        style={{ animation: "dropDown 0.7s ease both" }}
      >
        <nav
          className={`pointer-events-auto w-full max-w-7xl flex items-center justify-between px-5 rounded-2xl transition-all duration-500 ${
            scrolled
              ? "bg-[#111111]/90 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.35)] border border-white/8 py-3"
              : "bg-[#FFF9F0]/80 backdrop-blur-md border border-black/6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] py-3.5"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className={`font-syne font-extrabold text-[1.45rem] tracking-[-1.5px] transition-colors ${
              scrolled ? "text-white" : "text-[#111111]"
            }`}
          >
            Eazy<span className="text-[#FF5C1A]">Chise</span>
            <sup className="text-[0.4rem] text-[#FF5C1A] font-bold tracking-widest ml-0.5 align-super">F&B</sup>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-0.5 list-none">
            {links.map((l) => {
              const isActive = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`relative px-3.5 py-2 text-[0.83rem] font-medium rounded-xl transition-all duration-200 ${
                      isActive
                        ? scrolled
                          ? "text-white bg-white/10"
                          : "text-[#FF5C1A] bg-[#FF5C1A]/8"
                        : scrolled
                        ? "text-white/50 hover:text-white hover:bg-white/8"
                        : "text-[#555] hover:text-[#111] hover:bg-black/5"
                    }`}
                  >
                    {l.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FF5C1A]" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA / User Menu */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              
              <div className="flex items-center gap-2">
                {/* Notifications */}
                <div className="relative">
                  <button 
                    onClick={() => { setShowNotifications(!showNotifications); setDropdownOpen(false); }}
                    className={`relative p-2 rounded-full transition-colors cursor-pointer ${scrolled ? "hover:bg-white/10 text-white" : "hover:bg-black/5 text-[#555]"}`}
                  >
                    <Bell className="w-5 h-5" />
                    {notifications.length > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    )}
                  </button>
                  {showNotifications && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-black/5 overflow-hidden z-50 animate-fade-up">
                       <div className="p-4 border-b border-black/5 flex items-center justify-between">
                         <h4 className="font-bold text-sm text-[#111]">Notifikasi</h4>
                         {notifications.length > 0 && (
                           <button onClick={markNotificationsAsRead} className="text-[0.65rem] font-bold uppercase tracking-wider text-[#FF5C1A] cursor-pointer hover:underline">
                             Tandai dibaca
                           </button>
                         )}
                       </div>
                       <div className="max-h-80 overflow-y-auto">
                         {notifications.length === 0 ? (
                           <div className="p-8 text-center text-sm font-medium text-gray-400">Belum ada notifikasi baru</div>
                         ) : (
                           notifications.map(n => (
                             <div 
                               key={n.id} 
                               onClick={() => handleNotificationClick(n)}
                               className="p-4 border-b border-black/5 hover:bg-[#F8F8F6] transition-colors cursor-pointer"
                             >
                               <div className="flex items-start gap-3">
                                 <div className="w-2 h-2 mt-1.5 rounded-full bg-[#FF5C1A] flex-shrink-0" />
                                 <div>
                                   <p className="font-bold text-sm text-[#111]">{n.title}</p>
                                   <p className="text-xs text-[#666] mt-1 leading-relaxed">{n.message}</p>
                                   <p className="text-[0.6rem] text-[#999] mt-2 font-medium">{new Date(n.created_at).toLocaleString('id-ID')}</p>
                                 </div>
                               </div>
                             </div>
                           ))
                         )}
                       </div>
                    </div>
                  )}
                </div>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                    scrolled 
                      ? "hover:bg-white/8" 
                      : "hover:bg-black/5"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF5C1A] to-[#FF8C42] flex items-center justify-center text-white text-sm font-bold shadow-[0_4px_12px_rgba(255,92,26,0.3)] overflow-hidden relative">
                    {user?.image ? (
                      <Image 
                        src={user.image} 
                        alt={user.name} 
                        fill 
                        className="object-cover"
                      />
                    ) : (
                      user?.name ? user.name.charAt(0).toUpperCase() : "?"
                    )}
                  </div>
                  <span className={`text-[0.83rem] font-semibold ${scrolled ? "text-white/80" : "text-[#333]"}`}>
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""} ${scrolled ? "text-white/40" : "text-[#999]"}`} />
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-black/5 overflow-hidden z-50 animate-fade-up">
                    <div className="px-4 py-3 border-b border-black/5">
                      <p className="text-sm font-bold text-[#111] truncate">{user.name}</p>
                      <p className="text-xs text-[#999] truncate">{user.email}</p>
                    </div>
                    <div className="py-1.5">
                      <Link
                        href="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#555] hover:bg-[#FFF3E5] hover:text-[#FF5C1A] transition-colors font-medium"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#555] hover:bg-[#FFF3E5] hover:text-[#FF5C1A] transition-colors font-medium"
                      >
                        <UserIcon className="w-4 h-4" />
                        Profil
                      </Link>
                    </div>
                    <div className="border-t border-black/5 py-1.5">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium w-full cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Keluar
                      </button>
                    </div>
                  </div>
                )}
              </div>
              </div>
            ) : (
              
              <>
                <Link
                  href="/masuk"
                  className={`text-[0.83rem] font-semibold transition-colors ${
                    scrolled ? "text-white/50 hover:text-white" : "text-[#555] hover:text-[#111]"
                  }`}
                >
                  Masuk
                </Link>
                <Link
                  href="/daftar"
                  className="flex items-center gap-1.5 bg-[#FF5C1A] text-white pl-5 pr-4 py-2 rounded-xl text-[0.83rem] font-bold shadow-[0_4px_16px_rgba(255,92,26,0.35)] hover:bg-[#e04710] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(255,92,26,0.45)] transition-all duration-200"
                >
                  Mulai Gratis
                  <ArrowRight className="w-4 h-4 text-[#FFCF40]" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile: Burger */}
          <div className="lg:hidden flex items-center gap-2.5">
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              className={`w-8 h-8 flex flex-col justify-center items-center gap-[5px] rounded-lg transition-colors cursor-pointer ${
                scrolled ? "hover:bg-white/10" : "hover:bg-black/6"
              }`}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`block h-[1.5px] rounded-full transition-all duration-300 origin-center ${
                    scrolled ? "bg-white" : "bg-[#111]"
                  } ${
                    menuOpen
                      ? i === 0 ? "w-4 rotate-45 translate-y-[6.5px]"
                      : i === 1 ? "w-4 opacity-0 scale-x-0"
                      : "w-4 -rotate-45 -translate-y-[6.5px]"
                      : i === 1 ? "w-3" : "w-4"
                  }`}
                />
              ))}
            </button>

            {/* Mobile Notification Bell */}
            {user && (
              <div className="relative">
                <button 
                  onClick={() => { setShowNotifications(!showNotifications); setMenuOpen(false); }}
                  className={`relative p-2 rounded-lg transition-colors cursor-pointer ${scrolled ? "hover:bg-white/10 text-white" : "hover:bg-black/5 text-[#555]"}`}
                >
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                  )}
                </button>
                {showNotifications && (
                  <div className="fixed left-4 right-4 top-20 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-black/5 overflow-hidden z-[60] animate-fade-up lg:hidden">
                     <div className="p-4 border-b border-black/5 flex items-center justify-between">
                       <h4 className="font-bold text-sm text-[#111]">Notifikasi</h4>
                       {notifications.length > 0 && (
                         <button onClick={markNotificationsAsRead} className="text-[0.65rem] font-bold uppercase tracking-wider text-[#FF5C1A] cursor-pointer hover:underline">
                           Tandai dibaca
                         </button>
                       )}
                     </div>
                     <div className="max-h-80 overflow-y-auto">
                       {notifications.length === 0 ? (
                         <div className="p-8 text-center text-sm font-medium text-gray-400">Belum ada notifikasi baru</div>
                       ) : (
                         notifications.map(n => (
                           <div 
                             key={n.id} 
                             onClick={() => handleNotificationClick(n)}
                             className="p-4 border-b border-black/5 hover:bg-[#F8F8F6] transition-colors cursor-pointer"
                           >
                             <div className="flex items-start gap-3">
                               <div className="w-2 h-2 mt-1.5 rounded-full bg-[#FF5C1A] flex-shrink-0" />
                               <div>
                                 <p className="font-bold text-sm text-[#111]">{n.title}</p>
                                 <p className="text-xs text-[#666] mt-1 leading-relaxed">{n.message}</p>
                                 <p className="text-[0.6rem] text-[#999] mt-2 font-medium">{new Date(n.created_at).toLocaleString('id-ID')}</p>
                               </div>
                             </div>
                           </div>
                         ))
                       )}
                     </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>

      
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      
      <div
        className={`fixed top-4 right-4 bottom-4 z-50 w-[270px] rounded-2xl bg-[#FFF9F0] shadow-[0_24px_60px_rgba(0,0,0,0.2)] border border-black/6 transition-all duration-300 ease-out lg:hidden flex flex-col overflow-hidden ${
          menuOpen ? "translate-x-0 opacity-100" : "translate-x-[110%] opacity-0"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/6">
          <span className="font-syne font-extrabold text-[1.2rem] tracking-tight text-[#111]">
            Eazy<span className="text-[#FF5C1A]">Chise</span>
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-black/5 hover:bg-[#FF5C1A]/10 text-[#777] hover:text-[#FF5C1A] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Info (if logged in) */}
        {user && (
          <div className="px-5 py-4 border-b border-black/6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF5C1A] to-[#FF8C42] flex items-center justify-center text-white text-sm font-bold overflow-hidden relative">
              {user?.image ? (
                <Image 
                  src={user.image} 
                  alt={user.name} 
                  fill 
                  className="object-cover"
                />
              ) : (
                user?.name ? user.name.charAt(0).toUpperCase() : "?"
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#111] truncate">{user.name}</p>
              <p className="text-xs text-[#999] truncate">{user.email}</p>
            </div>
          </div>
        )}

        {/* Drawer Links */}
        <ul className="flex flex-col p-3 gap-0.5 list-none flex-1">
          {links.map((l, i) => {
            const isActive = pathname === l.href;
            return (
              <li key={l.href} style={{ transitionDelay: `${i * 40}ms` }}>
                <Link
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-[0.88rem] font-medium transition-all ${
                    isActive
                      ? "bg-[#FF5C1A]/10 text-[#FF5C1A]"
                      : "text-[#333] hover:bg-black/4 hover:text-[#111]"
                  }`}
                >
                  {l.label}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C1A]" />}
                </Link>
              </li>
            );
          })}

          {user && (
            <>
              <li>
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-[0.88rem] font-medium transition-all ${
                    pathname === "/dashboard"
                      ? "bg-[#FF5C1A]/10 text-[#FF5C1A]"
                      : "text-[#333] hover:bg-black/4 hover:text-[#111]"
                  }`}
                >
                  <span className="flex items-center gap-2"><LayoutDashboard className="w-4 h-4" /> Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-[0.88rem] font-medium transition-all ${
                    pathname === "/profile"
                      ? "bg-[#FF5C1A]/10 text-[#FF5C1A]"
                      : "text-[#333] hover:bg-black/4 hover:text-[#111]"
                  }`}
                >
                  <span className="flex items-center gap-2"><UserIcon className="w-4 h-4" /> Profil</span>
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-black/6 flex flex-col gap-2.5">
          {user ? (
            <button
              onClick={handleLogout}
              className="text-center py-2.5 rounded-xl text-[0.85rem] font-semibold text-red-500 hover:bg-red-50 transition-all cursor-pointer"
            >
              Keluar dari Akun
            </button>
          ) : (
            <>
              <Link
                href="/masuk"
                onClick={() => setMenuOpen(false)}
                className="text-center py-2.5 rounded-xl text-[0.85rem] font-semibold text-[#555] hover:text-[#111] hover:bg-black/4 transition-all"
              >
                Masuk ke Akun
              </Link>
              <Link
                href="/daftar"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-[#FF5C1A] text-white py-3 rounded-xl text-[0.88rem] font-bold shadow-[0_4px_16px_rgba(255,92,26,0.3)] hover:bg-[#e04710] transition-all"
              >
                Mulai Gratis Sekarang <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          )}
          <p className="text-center text-[0.68rem] text-[#bbb] flex items-center justify-center gap-1.5">
            {STATS.totalBrand}+ franchise F&amp;B terpercaya
            <span className="w-4 h-3 bg-red-500 relative flex flex-col rounded-[1px] overflow-hidden">
              <span className="h-1/2 bg-[#FF0000] w-full" />
              <span className="h-1/2 bg-white w-full" />
            </span>
          </p>
        </div>
      </div>
    </>
  );
}