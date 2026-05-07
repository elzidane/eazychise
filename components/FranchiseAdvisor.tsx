"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { 
  Wallet, 
  Coffee, 
  Leaf, 
  Zap, 
  User, 
  Sparkles, 
  ChevronDown,
  Trash2,
  X
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────
type Message = {
  role: "user" | "assistant";
  content: string;
};

type QuickPrompt = {
  icon: any;
  label: string;
  text: string;
};

const QUICK_PROMPTS: QuickPrompt[] = [
  { icon: Wallet, label: "Modal < Rp 5 Juta",  text: "Saya punya modal sekitar Rp 3-5 juta, franchise apa yang cocok untuk saya?" },
  { icon: Coffee, label: "Franchise Kopi",       text: "Saya tertarik franchise kopi, apa yang perlu saya siapkan?" },
  { icon: Leaf, label: "Pemula bisnis",        text: "Saya belum pernah bisnis sebelumnya, franchise F&B apa yang cocok untuk pemula?" },
  { icon: Zap, label: "ROI tercepat",         text: "Franchise mana yang paling cepat balik modalnya?" },
];

const GREETING: Message = {
  role: "assistant",
  content: "Halo! Saya EazyChise AI Advisor.\n\nSaya bisa bantu kamu menemukan franchise F&B terbaik — lengkap dengan kalkulasi BEP, estimasi profit, dan analisis risiko!\n\nCeritakan rencana bisnismu, atau pilih pertanyaan di bawah ini.",
};

// ─── Sparkle SVG ──────────────────────────────────────────────
function SparkleIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" fill="white" />
      <path d="M19 2L19.75 5.25L23 6L19.75 6.75L19 10L18.25 6.75L15 6L18.25 5.25L19 2Z" fill="white" opacity="0.6" />
      <path d="M5 16L5.5 18L7 18.5L5.5 19L5 21L4.5 19L3 18.5L4.5 18L5 16Z" fill="white" opacity="0.5" />
    </svg>
  );
}

// ─── Typing indicator ─────────────────────────────────────────
function TypingIndicator() {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
      <AIAvatar />
      <div style={{
        padding: "12px 16px", borderRadius: "18px 18px 18px 4px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,200,100,0.12)",
        backdropFilter: "blur(10px)",
      }}>
        <div style={{ display: "flex", gap: 5, alignItems: "center", height: 16 }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "linear-gradient(135deg,#FF8C42,#FFCF40)",
              animation: `eazyBounce 1.2s ease-in-out ${i * 0.18}s infinite`,
              display: "block",
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── AI Avatar ────────────────────────────────────────────────
function AIAvatar({ size = 34 }: { size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.42,
      flexShrink: 0,
      background: "linear-gradient(145deg,#FF5C1A 0%,#FF8C42 50%,#FFCF40 100%)",
      boxShadow: "0 4px 16px rgba(255,100,26,0.45), inset 0 1px 0 rgba(255,255,255,0.2)",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative",
    }}>
      <SparkleIcon size={size * 0.42} />
      <div style={{
        position: "absolute", inset: -1, borderRadius: size * 0.42,
        background: "linear-gradient(135deg,rgba(255,255,255,0.25) 0%,transparent 60%)",
        pointerEvents: "none",
      }} />
    </div>
  );
}

// ─── Typewriter text ──────────────────────────────────────────
function TypewriterText({ text, speed = 12, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const idxRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const finish = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setDisplayed(text);
    setDone(true);
    onDone?.();
  }, [text, onDone]);

  useEffect(() => {
    idxRef.current = 0;
    setDisplayed("");
    setDone(false);
    timerRef.current = setInterval(() => {
      idxRef.current += 1;
      setDisplayed(text.slice(0, idxRef.current));
      if (idxRef.current >= text.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        setDone(true);
        onDone?.();
      }
    }, speed);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span style={{ whiteSpace: "pre-wrap", position: "relative", zIndex: 1 }}>
      {displayed}
      {!done && (
        <span style={{
          display: "inline-block", width: 2, height: "1em",
          background: "linear-gradient(180deg,#FF8C42,#FFCF40)",
          borderRadius: 2, marginLeft: 2, verticalAlign: "text-bottom",
          animation: "eazyCursor 0.6s steps(1) infinite",
        }} />
      )}
      {!done && (
        <button
          onClick={finish}
          title="Skip"
          style={{
            marginLeft: 8, fontSize: "0.62rem", padding: "1px 7px",
            borderRadius: 99, cursor: "pointer",
            background: "rgba(255,140,60,0.15)",
            border: "1px solid rgba(255,140,60,0.3)",
            color: "#FFAB68", fontFamily: "inherit", verticalAlign: "middle",
            transition: "all 0.18s",
          }}
        >
          skip
        </button>
      )}
    </span>
  );
}

// ─── Message bubble ───────────────────────────────────────────
function MessageBubble({ msg, isNew, animate }: { msg: Message; isNew?: boolean; animate?: boolean }) {
  const isUser = msg.role === "user";
  const showTypewriter = !isUser && isNew && animate;
  return (
    <div
      style={{
        display: "flex", gap: 10, alignItems: "flex-end",
        flexDirection: isUser ? "row-reverse" : "row",
        animation: isNew ? "eazySlideIn 0.38s cubic-bezier(0.34,1.56,0.64,1) both" : "none",
      }}
    >
      {!isUser && <AIAvatar />}

      <div style={{
        maxWidth: "76%",
        padding: isUser ? "11px 16px" : "13px 16px",
        borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
        fontSize: "0.82rem", lineHeight: 1.75, letterSpacing: "0.008em",
        position: "relative", overflow: "hidden",
        ...(isUser ? {
          background: "linear-gradient(145deg,#FF5C1A,#FF8C42)",
          color: "white",
          boxShadow: "0 6px 24px rgba(255,92,26,0.38), inset 0 1px 0 rgba(255,255,255,0.2)",
        } : {
          background: "rgba(255,255,255,0.055)",
          border: "1px solid rgba(255,200,100,0.1)",
          color: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }),
      }}>
        {isUser && (
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
            background: "linear-gradient(135deg,rgba(255,255,255,0.15) 0%,transparent 60%)",
            pointerEvents: "none",
          }} />
        )}
        {showTypewriter
          ? <TypewriterText text={msg.content} speed={12} />
          : <span style={{ whiteSpace: "pre-wrap", position: "relative", zIndex: 1 }}>{msg.content}</span>
        }
      </div>

      {isUser && (
        <div style={{
          width: 34, height: 34, borderRadius: 12, flexShrink: 0,
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.12)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "rgba(255,255,255,0.5)",
        }}>
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}

// ─── Quick prompt button ──────────────────────────────────────
function QuickBtn({ q, onSend }: { q: QuickPrompt; onSend: (t: string) => void }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={() => onSend(q.text)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        textAlign: "left", padding: "10px 13px", borderRadius: 13, cursor: "pointer",
        background: hover ? "rgba(255,120,30,0.14)" : "rgba(255,255,255,0.04)",
        border: hover ? "1px solid rgba(255,120,30,0.4)" : "1px solid rgba(255,255,255,0.07)",
        color: hover ? "#FFAB68" : "rgba(255,255,255,0.62)",
        fontSize: "0.74rem", fontWeight: 500, transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
        lineHeight: 1.35, display: "flex", alignItems: "center", gap: 8,
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hover ? "0 6px 20px rgba(255,92,26,0.15)" : "none",
        fontFamily: "inherit",
      }}
    >
      <q.icon className="w-4 h-4 flex-shrink-0" />
      <span>{q.label}</span>
    </button>
  );
}

// ─── Icon buttons ─────────────────────────────────────────────
function IconBtn({ onClick, title, children }: { onClick: () => void; title: string; children: React.ReactNode }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick} title={title}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 30, height: 30, borderRadius: 9, cursor: "pointer",
        background: hover ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)",
        border: hover ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(255,255,255,0.07)",
        color: hover ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.18s",
        transform: hover ? "scale(1.08)" : "scale(1)",
      }}
    >
      {children}
    </button>
  );
}

// ─── Send button ──────────────────────────────────────────────
function SendBtn({ onClick, active, loading }: { onClick: () => void; active: boolean; loading: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick} disabled={!active || loading}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 34, height: 34, borderRadius: 11, flexShrink: 0, cursor: active ? "pointer" : "default",
        background: active && !loading
          ? hover
            ? "linear-gradient(145deg,#FF6B2B,#FF9A50)"
            : "linear-gradient(145deg,#FF5C1A,#FF8C42)"
          : "rgba(255,255,255,0.06)",
        boxShadow: active && !loading ? `0 4px 18px rgba(255,92,26,${hover ? 0.55 : 0.38})` : "none",
        border: "none", display: "flex", alignItems: "center", justifyContent: "center",
        opacity: loading ? 0.45 : 1,
        transition: "all 0.22s cubic-bezier(0.34,1.56,0.64,1)",
        transform: active && hover && !loading ? "scale(1.1) translateY(-1px)" : "scale(1)",
      }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z"/>
      </svg>
    </button>
  );
}

// ─── Main widget ──────────────────────────────────────────────
export default function FranchiseAdvisor() {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING as Message]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const [hasNew, setHasNew]   = useState(false);
  const [newMsgIdx, setNewMsgIdx] = useState<number | null>(null);
  const [animIdx, setAnimIdx]   = useState<number | null>(null);
  const [fabHover, setFabHover] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setHasNew(false);
      setTimeout(() => inputRef.current?.focus(), 380);
    }
  }, [open]);

  async function send(text?: string) {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;
    setInput("");

    const newMessages: Message[] = [...messages, { role: "user" as const, content: userText }];
    setMessages(newMessages);
    setNewMsgIdx(newMessages.length - 1);
    setLoading(true);

    try {
      const res = await fetch("/api/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })) }),
      });
      if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error ?? `HTTP ${res.status}`); }
      const data = await res.json();
      const reply = data.reply ?? "Maaf, tidak ada respons dari AI.";
      const next: Message[] = [...newMessages, { role: "assistant" as const, content: reply }];
      setMessages(next);
      setNewMsgIdx(next.length - 1);
      setAnimIdx(next.length - 1);
      if (!open) setHasNew(true);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Koneksi bermasalah";
      const next: Message[] = [...newMessages, { role: "assistant" as const, content: `⚠️ ${msg}` }];
      setMessages(next);
      setNewMsgIdx(next.length - 1);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  const isGreeting = messages.length === 1 && !loading;

  // Generate contextual quick replies based on conversation
  const contextualReplies = (() => {
    if (loading || messages.length < 2) return [];
    const lastAI = messages.filter(m => m.role === "assistant").pop();
    if (!lastAI) return [];
    const text = lastAI.content.toLowerCase();
    
    const suggestions: { label: string; text: string }[] = [];
    
    if (text.includes("bep") || text.includes("balik modal")) {
      suggestions.push({ label: "📊 Hitung BEP detail", text: "Bantu hitung BEP lebih detail dong, dengan biaya operasional lengkap" });
    }
    if (text.includes("swot")) {
      suggestions.push({ label: "🔍 Analisis risiko", text: "Apa saja risiko terburuk yang bisa terjadi dan cara mengatasinya?" });
    }
    if (text.includes("kopi") || text.includes("minuman")) {
      suggestions.push({ label: "☕ Bandingkan kopi", text: "Bandingkan semua franchise kopi yang ada di EazyChise" });
    }
    if (text.includes("kuliner") || text.includes("makanan")) {
      suggestions.push({ label: "🍜 Bandingkan kuliner", text: "Bandingkan franchise kuliner yang cocok untuk pemula" });
    }
    if (text.includes("lokasi") || text.includes("kota")) {
      suggestions.push({ label: "📍 Tips lokasi", text: "Bagaimana cara memilih lokasi yang strategis untuk franchise F&B?" });
    }
    
    // Always add general follow-ups
    if (suggestions.length < 2) {
      suggestions.push({ label: "💰 Modal terkecil", text: "Mana franchise dengan modal paling kecil yang bisa saya mulai?" });
    }
    if (suggestions.length < 3) {
      suggestions.push({ label: "⚡ ROI tercepat", text: "Franchise mana yang paling cepat balik modalnya?" });
    }
    
    return suggestions.slice(0, 3);
  })();

  return (
    <>
      {/* ════ Global styles ════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@600;700;800&display=swap');

        @keyframes eazyBounce {
          0%,60%,100%{transform:translateY(0);opacity:.35}
          30%{transform:translateY(-6px);opacity:1}
        }
        @keyframes eazySlideIn {
          from{opacity:0;transform:translateY(12px) scale(0.94)}
          to{opacity:1;transform:translateY(0) scale(1)}
        }
        @keyframes eazyFabGlow {
          0%,100%{box-shadow:0 8px 32px rgba(255,92,26,.5),0 0 0 0 rgba(255,180,60,.25)}
          50%{box-shadow:0 8px 36px rgba(255,92,26,.55),0 0 0 10px rgba(255,180,60,0)}
        }
        @keyframes eazyPanelIn {
          from{opacity:0;transform:scale(0.86) translateY(20px)}
          to{opacity:1;transform:scale(1) translateY(0)}
        }
        @keyframes eazyStatusDot {
          0%,100%{opacity:1;transform:scale(1)}
          50%{opacity:0.45;transform:scale(0.75)}
        }
        @keyframes eazyPulseRing {
          0%{transform:scale(1);opacity:0.6}
          100%{transform:scale(1.75);opacity:0}
        }
        @keyframes eazyHeaderShimmer {
          0%{background-position:200% center}
          100%{background-position:-200% center}
        }
        @keyframes eazyBadgePop {
          0%{transform:scale(0);opacity:0}
          70%{transform:scale(1.3)}
          100%{transform:scale(1);opacity:1}
        }
        @keyframes eazyCursor {
          0%,49%{opacity:1}
          50%,100%{opacity:0}
        }
        .eazy-msgs::-webkit-scrollbar{width:3px}
        .eazy-msgs::-webkit-scrollbar-track{background:transparent}
        .eazy-msgs::-webkit-scrollbar-thumb{background:rgba(255,150,60,.18);border-radius:99px}
        .eazy-msgs::-webkit-scrollbar-thumb:hover{background:rgba(255,150,60,.35)}
        .eazy-input::placeholder{color:rgba(255,255,255,.25)!important}
        
        .eazy-fab-container {
          right: 24px;
          transition: right 0.5s cubic-bezier(0.34,1.56,0.64,1);
        }
        @media (max-width: 1023px) {
          body.nav-menu-open .eazy-fab-container {
            right: calc(100% - 80px);
          }
        }
      `}</style>

      {/* ════ FAB ════ */}
      <div className="eazy-fab-container" style={{ position: "fixed", bottom: 24, zIndex: 9999 }}>
        {/* Pulse rings (only when closed) */}
        {!open && (
          <>
            <div style={{
              position: "absolute", inset: 0, borderRadius: 17,
              border: "1.5px solid rgba(255,140,66,0.5)",
              animation: "eazyPulseRing 2s ease-out infinite",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", inset: 0, borderRadius: 17,
              border: "1.5px solid rgba(255,140,66,0.3)",
              animation: "eazyPulseRing 2s ease-out 0.7s infinite",
              pointerEvents: "none",
            }} />
          </>
        )}

        <button
          onClick={() => setOpen(o => !o)}
          onMouseEnter={() => setFabHover(true)}
          onMouseLeave={() => setFabHover(false)}
          aria-label="Toggle EazyChise AI"
          style={{
            width: 56, height: 56, borderRadius: 17,
            background: open
              ? "rgba(20,18,16,0.95)"
              : `linear-gradient(145deg,#FF5C1A,#FF8C42,#FFCF40)`,
            boxShadow: open
              ? "0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)"
              : `0 8px 30px rgba(255,92,26,0.52), inset 0 1px 0 rgba(255,255,255,0.25)`,
            animation: !open ? "eazyFabGlow 2.8s ease-in-out infinite" : "none",
            border: open ? "1px solid rgba(255,255,255,0.08)" : "none",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.28s cubic-bezier(0.34,1.56,0.64,1)",
            transform: fabHover ? "scale(1.08) translateY(-2px)" : "scale(1)",
            position: "relative",
          }}
        >
          <div style={{ transition: "transform 0.32s cubic-bezier(0.34,1.56,0.64,1)", transform: open ? "rotate(90deg) scale(0.9)" : "rotate(0) scale(1)" }}>
            {open
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              : <SparkleIcon size={20} />
            }
          </div>

          {/* New message badge */}
          {hasNew && !open && (
            <span style={{
              position: "absolute", top: -5, right: -5,
              width: 16, height: 16, borderRadius: "50%",
              background: "linear-gradient(135deg,#FFCF40,#FFE082)",
              border: "2.5px solid #0e0c0a",
              animation: "eazyBadgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
              boxShadow: "0 2px 8px rgba(255,207,64,0.5)",
            }} />
          )}
        </button>
      </div>

      {/* ════ Chat Panel ════ */}
      <div style={{
        position: "fixed", bottom: 92, right: 24, zIndex: 9998,
        width: 388, maxWidth: "calc(100vw - 28px)", height: 580,
        borderRadius: 26,
        background: "rgba(10,9,8,0.92)",
        backdropFilter: "blur(48px) saturate(180%)",
        WebkitBackdropFilter: "blur(48px) saturate(180%)",
        border: "1px solid rgba(255,160,60,0.14)",
        boxShadow: [
          "0 40px 100px rgba(0,0,0,0.7)",
          "0 0 0 0.5px rgba(255,255,255,0.04) inset",
          "0 1px 0 rgba(255,160,60,0.12) inset",
        ].join(", "),
        display: "flex", flexDirection: "column", overflow: "hidden",
        animation: open ? "eazyPanelIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both" : "none",
        opacity: open ? 1 : 0,
        transform: open ? "scale(1) translateY(0)" : "scale(0.86) translateY(20px)",
        transition: open ? "none" : "opacity 0.22s ease, transform 0.22s ease",
        pointerEvents: open ? "all" : "none",
        fontFamily: "'DM Sans', sans-serif",
      }}>

        {/* ── Ambient top glow ── */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 180,
          background: "radial-gradient(ellipse 80% 80% at 50% -10%, rgba(255,100,26,0.12) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* ── Header ────────────────────────── */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "15px 16px 15px 18px",
          borderBottom: "1px solid rgba(255,160,60,0.1)",
          flexShrink: 0, position: "relative", zIndex: 1,
        }}>
          {/* Animated logo */}
          <div style={{ position: "relative" }}>
            <AIAvatar size={40} />
            {/* Online ring */}
            <div style={{
              position: "absolute", bottom: -1, right: -1,
              width: 11, height: 11, borderRadius: "50%",
              background: "linear-gradient(135deg,#22c55e,#4ade80)",
              border: "2px solid rgba(10,9,8,0.95)",
              boxShadow: "0 0 8px rgba(34,197,94,0.6)",
            }} />
          </div>

          {/* Name block */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
              <span style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800,
                fontSize: "0.95rem", letterSpacing: "-0.03em",
                backgroundImage: "linear-gradient(135deg,#fff 20%,#FFCF40 100%)",
                backgroundColor: "transparent",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                EazyChise
              </span>
              <span style={{
                fontSize: "0.63rem", fontWeight: 700, padding: "2px 8px", borderRadius: 99,
                background: "rgba(255,100,26,0.15)",
                border: "1px solid rgba(255,140,66,0.35)",
                color: "#FFAB68", letterSpacing: "0.05em", textTransform: "uppercase",
              }}>
                AI Advisor
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{
                width: 5, height: 5, borderRadius: "50%",
                background: "#22c55e", display: "inline-block",
                animation: "eazyStatusDot 2.4s ease-in-out infinite",
                boxShadow: "0 0 5px rgba(34,197,94,0.7)",
              }} />
              <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.01em" }}>
                Powered by EazyAI · Online sekarang
              </span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.07)", margin: "0 4px" }} />

          {/* Actions */}
          <IconBtn onClick={() => setMessages([GREETING])} title="Hapus chat">
            <Trash2 className="w-3.5 h-3.5" />
          </IconBtn>
          <IconBtn onClick={() => setOpen(false)} title="Tutup">
            <X className="w-3.5 h-3.5" />
          </IconBtn>
        </div>

        {/* ── Messages ─────────────────────── */}
        <div
          className="eazy-msgs"
          style={{
            flex: 1, overflowY: "auto", padding: "18px 16px",
            display: "flex", flexDirection: "column", gap: 14,
            position: "relative", zIndex: 1,
          }}
        >
          {messages.map((m, i) => (
            <MessageBubble key={i} msg={m} isNew={i === newMsgIdx} animate={i === animIdx} />
          ))}
          {loading && <TypingIndicator />}
          
          {/* Contextual quick replies */}
          {contextualReplies.length > 0 && !loading && (
            <div style={{ 
              display: "flex", flexWrap: "wrap", gap: 6, 
              paddingLeft: 44, marginTop: 4,
              animation: "eazySlideIn 0.3s ease both",
            }}>
              {contextualReplies.map((r, i) => (
                <button
                  key={i}
                  onClick={() => send(r.text)}
                  style={{
                    padding: "7px 12px", borderRadius: 12, cursor: "pointer",
                    background: "rgba(255,120,30,0.08)",
                    border: "1px solid rgba(255,120,30,0.2)",
                    color: "#FFAB68", fontSize: "0.7rem", fontWeight: 600,
                    transition: "all 0.2s", fontFamily: "inherit",
                    lineHeight: 1.3,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,120,30,0.18)";
                    e.currentTarget.style.borderColor = "rgba(255,120,30,0.4)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,120,30,0.08)";
                    e.currentTarget.style.borderColor = "rgba(255,120,30,0.2)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>
          )}
          
          <div ref={bottomRef} />
        </div>

        {/* ── Quick prompts ─────────────────── */}
        {isGreeting && (
          <div style={{
            padding: "0 14px 14px",
            flexShrink: 0,
            borderTop: "1px solid rgba(255,160,60,0.08)",
            position: "relative", zIndex: 1,
          }}>
            <p style={{
              fontSize: "0.62rem", fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.18)", margin: "12px 2px 9px",
            }}>
              Mulai dari sini →
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
              {QUICK_PROMPTS.map(q => <QuickBtn key={q.label} q={q} onSend={send} />)}
            </div>
          </div>
        )}

        {/* ── Input area ────────────────────── */}
        <div style={{
          padding: isGreeting ? "0 14px 14px" : "12px 14px 14px",
          flexShrink: 0,
          borderTop: isGreeting ? "none" : "1px solid rgba(255,160,60,0.08)",
          position: "relative", zIndex: 1,
        }}>
          <InputField
            inputRef={inputRef}
            value={input}
            onChange={setInput}
            onKeyDown={handleKey}
            onSend={() => send()}
            loading={loading}
          />
          <div style={{
            textAlign: "center", marginTop: 9,
            fontSize: "0.59rem", letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.14)",
          }}>
            EazyChise AI · Spesialis Franchise F&B Indonesia
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Input field (extracted to avoid re-render flicker) ───────
function InputField({ inputRef, value, onChange, onKeyDown, onSend, loading }: {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  value: string;
  onChange: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  loading: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{
      display: "flex", alignItems: "flex-end", gap: 9,
      padding: "10px 12px 10px 14px", borderRadius: 16,
      background: focused ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
      border: focused
        ? "1px solid rgba(255,140,60,0.5)"
        : "1px solid rgba(255,255,255,0.08)",
      boxShadow: focused
        ? "0 0 0 3px rgba(255,100,26,0.1), 0 4px 20px rgba(0,0,0,0.3)"
        : "0 2px 12px rgba(0,0,0,0.2)",
      transition: "all 0.22s cubic-bezier(0.34,1.56,0.64,1)",
    }}>
      <textarea
        ref={inputRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Tanya soal franchise F&B kamu..."
        rows={1}
        className="eazy-input"
        style={{
          flex: 1, resize: "none", outline: "none", background: "transparent",
          fontSize: "0.83rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.6,
          minHeight: 22, maxHeight: 100, border: "none",
          fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.005em",
        }}
        onInput={e => {
          const el = e.target as HTMLTextAreaElement;
          el.style.height = "auto";
          el.style.height = Math.min(el.scrollHeight, 100) + "px";
        }}
      />
      <SendBtn onClick={onSend} active={!!value.trim()} loading={loading} />
    </div>
  );
}