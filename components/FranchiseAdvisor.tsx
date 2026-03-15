"use client";
import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const QUICK_PROMPTS = [
  { icon: "💰", label: "Modal < Rp 5 Juta", text: "Saya punya modal sekitar Rp 3-5 juta, franchise apa yang cocok untuk saya?" },
  { icon: "☕", label: "Franchise Kopi", text: "Saya tertarik franchise kopi, apa yang perlu saya siapkan?" },
  { icon: "🌱", label: "Pemula bisnis", text: "Saya belum pernah bisnis sebelumnya, franchise F&B apa yang cocok untuk pemula?" },
  { icon: "⚡", label: "ROI tercepat", text: "Franchise mana yang paling cepat balik modalnya?" },
];

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" fill="white" />
      <path d="M19 2L19.75 5.25L23 6L19.75 6.75L19 10L18.25 6.75L15 6L18.25 5.25L19 2Z" fill="white" opacity="0.6" />
      <path d="M5 16L5.5 18L7 18.5L5.5 19L5 21L4.5 19L3 18.5L4.5 18L5 16Z" fill="white" opacity="0.5" />
    </svg>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-2.5 items-end">
      <div className="w-8 h-8 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#FF5C1A,#FF8C42)", boxShadow: "0 4px 14px rgba(255,92,26,0.35)" }}>
        <SparkleIcon />
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-bl-sm" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="flex gap-1.5 items-center" style={{ height: 16 }}>
          {[0,1,2].map(i => (
            <span key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: "#FF7A3D", animation: `typingBounce 1.4s ease-in-out ${i*0.16}s infinite` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ msg, isNew }: { msg: Message; isNew?: boolean }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex gap-2.5 items-end ${isUser ? "flex-row-reverse" : "flex-row"}`} style={{ animation: isNew ? "msgSlideIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both" : "none" }}>
      {!isUser && (
        <div className="w-8 h-8 rounded-2xl flex items-center justify-center flex-shrink-0 mb-0.5" style={{ background: "linear-gradient(135deg,#FF5C1A,#FF8C42)", boxShadow: "0 4px 14px rgba(255,92,26,0.35)" }}>
          <SparkleIcon />
        </div>
      )}
      <div
        className={`max-w-[78%] px-4 py-3 text-[0.83rem] leading-[1.75] ${isUser ? "rounded-2xl rounded-br-sm" : "rounded-2xl rounded-bl-sm"}`}
        style={isUser
          ? { background: "linear-gradient(135deg,#FF5C1A,#FF7A3D)", color: "white", boxShadow: "0 4px 20px rgba(255,92,26,0.3)" }
          : { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)" }
        }
      >
        <span style={{ whiteSpace: "pre-wrap" }}>{msg.content}</span>
      </div>
    </div>
  );
}

export default function FranchiseAdvisor() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Halo! ✨ Saya GoChise AI Advisor.\n\nSaya siap bantu kamu menemukan franchise F&B yang paling cocok sesuai modal, lokasi, dan tujuan bisnismu. Ceritakan sedikit tentang dirimu — atau pilih pertanyaan di bawah! 🚀" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasNew, setHasNew] = useState(false);
  const [newMsgIndex, setNewMsgIndex] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);
  useEffect(() => {
    if (open) { setHasNew(false); setTimeout(() => inputRef.current?.focus(), 350); }
  }, [open]);

  async function send(text?: string) {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setNewMsgIndex(newMessages.length - 1);
    setLoading(true);
    try {
      const res = await fetch("/api/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })) }),
      });
      if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error ?? `HTTP ${res.status}`); }
      const data = await res.json();
      const reply = data.reply ?? "Maaf, terjadi kesalahan.";
      const next = [...newMessages, { role: "assistant" as const, content: reply }];
      setMessages(next);
      setNewMsgIndex(next.length - 1);
      if (!open) setHasNew(true);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Koneksi bermasalah";
      const next = [...newMessages, { role: "assistant" as const, content: `Maaf, ${msg} 🙏` }];
      setMessages(next);
      setNewMsgIndex(next.length - 1);
    } finally { setLoading(false); }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  const isGreeting = messages.length === 1 && !loading;

  return (
    <>
      <style>{`
        @keyframes typingBounce { 0%,60%,100%{transform:translateY(0);opacity:.4} 30%{transform:translateY(-5px);opacity:1} }
        @keyframes msgSlideIn { from{opacity:0;transform:translateY(10px) scale(.96)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes fabGlow { 0%,100%{box-shadow:0 8px 32px rgba(255,92,26,.45),0 0 0 0 rgba(255,92,26,.3)} 50%{box-shadow:0 8px 32px rgba(255,92,26,.45),0 0 0 8px rgba(255,92,26,0)} }
        @keyframes panelIn { from{opacity:0;transform:scale(.88) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.8)} }
        .chat-msgs::-webkit-scrollbar{width:3px}
        .chat-msgs::-webkit-scrollbar-track{background:transparent}
        .chat-msgs::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:99px}
      `}</style>

      {/* FAB */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Buka AI Advisor"
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 50,
          width: 56, height: 56, borderRadius: 16,
          background: open ? "linear-gradient(135deg,#2a2a2e,#111)" : "linear-gradient(135deg,#FF5C1A,#FF8C42)",
          boxShadow: open ? "0 8px 24px rgba(0,0,0,.5)" : "0 8px 32px rgba(255,92,26,.5)",
          animation: !open ? "fabGlow 2.5s ease-in-out infinite" : "none",
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background .25s, box-shadow .25s, transform .15s",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.07)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
      >
        <div style={{ transition: "transform .3s", transform: open ? "rotate(90deg)" : "rotate(0)" }}>
          {open
            ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            : <SparkleIcon />
          }
        </div>
        {hasNew && !open && (
          <span style={{ position:"absolute", top:-4, right:-4, width:14, height:14, borderRadius:"50%", background:"#FFCF40", border:"2px solid #0e0e10" }} />
        )}
      </button>

      {/* Panel */}
      <div style={{
        position: "fixed", bottom: 92, right: 24, zIndex: 50,
        width: 380, maxWidth: "calc(100vw - 24px)", height: 560,
        borderRadius: 24,
        background: "rgba(12,12,14,0.94)",
        backdropFilter: "blur(40px) saturate(160%)",
        WebkitBackdropFilter: "blur(40px) saturate(160%)",
        border: "1px solid rgba(255,255,255,0.09)",
        boxShadow: "0 32px 80px rgba(0,0,0,.6), inset 0 0 0 0.5px rgba(255,255,255,.04)",
        display: "flex", flexDirection: "column", overflow: "hidden",
        animation: open ? "panelIn .35s cubic-bezier(.34,1.56,.64,1) both" : "none",
        opacity: open ? 1 : 0,
        transform: open ? "scale(1) translateY(0)" : "scale(.88) translateY(16px)",
        transition: open ? "none" : "opacity .2s, transform .2s",
        pointerEvents: open ? "all" : "none",
      }}>

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "16px 20px",
          background: "linear-gradient(180deg,rgba(255,92,26,.1) 0%,transparent 100%)",
          borderBottom: "1px solid rgba(255,255,255,.07)",
          flexShrink: 0,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 14, flexShrink: 0,
            background: "linear-gradient(135deg,#FF5C1A,#FF8C42)",
            boxShadow: "0 4px 20px rgba(255,92,26,.4), inset 0 0 0 1px rgba(255,255,255,.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <SparkleIcon />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: "var(--font-syne,sans-serif)", fontWeight: 700, color: "white", fontSize: "0.92rem", letterSpacing: "-0.02em" }}>
                EazyChise
              </span>
              <span style={{
                fontSize: "0.68rem", fontWeight: 600, padding: "2px 8px", borderRadius: 99,
                background: "rgba(255,92,26,.18)", color: "#FF8C42", border: "1px solid rgba(255,92,26,.3)",
                letterSpacing: "0.02em",
              }}>
                AI Advisor
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%", background: "#22c55e",
                boxShadow: "0 0 6px #22c55e",
                animation: "dot 2s ease-in-out infinite",
                display: "inline-block",
              }} />
              <span style={{ fontSize: "0.67rem", color: "rgba(255,255,255,.35)", letterSpacing: "0.01em" }}>
                Analisis franchise · EazyChise AI
              </span>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            style={{
              width: 30, height: 30, borderRadius: 10, cursor: "pointer",
              background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)",
              color: "rgba(255,255,255,.4)", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all .15s",
            }}
            onMouseEnter={e => { const b = e.currentTarget; b.style.background="rgba(255,255,255,.12)"; b.style.color="white"; }}
            onMouseLeave={e => { const b = e.currentTarget; b.style.background="rgba(255,255,255,.05)"; b.style.color="rgba(255,255,255,.4)"; }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chat-msgs" style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 12 }}>
          {messages.map((m, i) => <MessageBubble key={i} msg={m} isNew={i === newMsgIndex} />)}
          {loading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Quick prompts */}
        {isGreeting && (
          <div style={{ padding: "0 12px 12px", flexShrink: 0, borderTop: "1px solid rgba(255,255,255,.06)" }}>
            <p style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,.22)", margin: "10px 4px 8px" }}>
              Mulai dari sini
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {QUICK_PROMPTS.map(q => (
                <button
                  key={q.label}
                  onClick={() => send(q.text)}
                  style={{
                    textAlign: "left", padding: "10px 12px", borderRadius: 12, cursor: "pointer",
                    background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)",
                    color: "rgba(255,255,255,.7)", fontSize: "0.75rem", fontWeight: 500,
                    transition: "all .2s", lineHeight: 1.3,
                  }}
                  onMouseEnter={e => { const b = e.currentTarget; b.style.background="rgba(255,92,26,.15)"; b.style.border="1px solid rgba(255,92,26,.35)"; b.style.color="#FF8C42"; b.style.transform="translateY(-1px)"; }}
                  onMouseLeave={e => { const b = e.currentTarget; b.style.background="rgba(255,255,255,.05)"; b.style.border="1px solid rgba(255,255,255,.08)"; b.style.color="rgba(255,255,255,.7)"; b.style.transform="translateY(0)"; }}
                >
                  <span style={{ marginRight: 6 }}>{q.icon}</span>{q.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div style={{ padding: isGreeting ? "0 12px 12px" : "10px 12px 12px", flexShrink: 0, borderTop: isGreeting ? "none" : "1px solid rgba(255,255,255,.06)" }}>
          <div
            style={{
              display: "flex", alignItems: "flex-end", gap: 8,
              padding: "10px 14px", borderRadius: 16,
              background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)",
              transition: "all .2s",
            }}
            onFocusCapture={e => { const d = e.currentTarget as HTMLDivElement; d.style.border="1px solid rgba(255,92,26,.45)"; d.style.background="rgba(255,255,255,.08)"; d.style.boxShadow="0 0 0 3px rgba(255,92,26,.1)"; }}
            onBlurCapture={e => { const d = e.currentTarget as HTMLDivElement; d.style.border="1px solid rgba(255,255,255,.1)"; d.style.background="rgba(255,255,255,.06)"; d.style.boxShadow="none"; }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Tanya soal franchise F&B kamu..."
              rows={1}
              style={{
                flex: 1, resize: "none", outline: "none", background: "transparent",
                fontSize: "0.84rem", color: "rgba(255,255,255,.9)", lineHeight: 1.55,
                minHeight: 22, maxHeight: 96,
                border: "none", fontFamily: "inherit",
              }}
              onInput={e => {
                const el = e.target as HTMLTextAreaElement;
                el.style.height = "auto";
                el.style.height = Math.min(el.scrollHeight, 96) + "px";
              }}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              style={{
                width: 32, height: 32, borderRadius: 10, flexShrink: 0, cursor: "pointer",
                background: input.trim() && !loading ? "linear-gradient(135deg,#FF5C1A,#FF8C42)" : "rgba(255,255,255,.08)",
                boxShadow: input.trim() && !loading ? "0 4px 14px rgba(255,92,26,.4)" : "none",
                border: "none", display: "flex", alignItems: "center", justifyContent: "center",
                opacity: loading ? 0.5 : 1,
                transition: "all .2s",
              }}
              onMouseEnter={e => { if (input.trim() && !loading) (e.currentTarget as HTMLButtonElement).style.transform="scale(1.1)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform="scale(1)"; }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z"/>
              </svg>
            </button>
          </div>
          <p style={{ textAlign: "center", fontSize: "0.6rem", color: "rgba(255,255,255,.18)", letterSpacing: "0.05em", marginTop: 8 }}>
            EazyChise AI · Khusus Franchise F&B Indonesia
          </p>
        </div>
      </div>
    </>
  );
}