"use client";
import dynamic from "next/dynamic";

const AuroraBackground  = dynamic(() => import("./AuroraBackground"),  { ssr: false });
const ParticleNetwork   = dynamic(() => import("./ParticleNetwork"),   { ssr: false });
const CursorFX          = dynamic(() => import("./Cursorfx"),          { ssr: false });
const ClickSpark        = dynamic(() => import("./ClickSpark"),        { ssr: false });
const ScrollProgressBar = dynamic(() => import("./Scrollprogresbar"), { ssr: false });

export default function GlobalEffects() {
  return (
    <>
      {/* <AuroraBackground />
      <ParticleNetwork />
      <CursorFX />
      <ClickSpark /> */}
      <ScrollProgressBar />
    </>
  );
}