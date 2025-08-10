"use client";
import { useEffect, useRef } from "react";
import Scrollbar from "smooth-scrollbar";

export default function SmoothScroll() {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const scrollbar = Scrollbar.init(scrollRef.current, {
      damping: 0.07,  // smoothness, lower is smoother/slower
      alwaysShowTracks: false,
    });

    return () => scrollbar.destroy();
  }, []);

  return (
    <div ref={scrollRef} style={{ height: "100vh", overflow: "hidden" }}>
      {/* Wrap your whole app content here */}
      <div style={{ minHeight: "200vh" }}>
        {/* Your actual page content goes here */}
      </div>
    </div>
  );
}
