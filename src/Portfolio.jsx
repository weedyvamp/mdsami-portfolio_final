import { useState, useEffect, useRef, useCallback } from "react";

// CYBERPUNK PALETTE
const C = {
  yellow: "#FFE600",
  cyan: "#00E5FF",
  black: "#000000",
  bg: "#060608",
  bgAlt: "#09090c",
  dim: "rgba(255,255,255,0.25)",
  dimmer: "rgba(255,255,255,0.10)",
};

const PROJECTS = [
  { id: 1, title: "CAPMINT TURBO MODE", category: "MOTION", year: "2026", description: "Product launch video for Capmint. High-energy visuals bringing the Turbo Mode to life.", color: C.yellow, videoId: "eNCKT36KqMM" },
  { id: 2, title: "YT LONGFORM HOOK", category: "EDIT", year: "2025", description: "Hook sequence for a YouTube longform video. Punchy cuts designed to stop the scroll.", color: C.cyan, videoId: "9S89UQZ_pyw" },
  { id: 3, title: "CAPMINT AI AD", category: "EDIT", year: "2025", description: "AI-powered ad film for Capmint. Edited to hit hard and convert fast.", color: C.yellow, videoId: "6I03uaYfg0Y" },
  { id: 4, title: "CAPMINT LANDING PAGE", category: "MOTION", year: "2024", description: "Landing page animation for Capmint. Smooth motion design that guides the eye and sells the product.", color: C.cyan, videoId: "RARbCuQiItg" },
  { id: 5, title: "TETR BUSINESS COLLEGE", category: "EDIT", year: "2024", description: "Longform video edit for TETR Business College. Clean storytelling, sharp pacing.", color: C.yellow, videoId: "pDvhJie5yW8" },
  { id: 6, title: "ZOHO CREATOR'S PREDICTION", category: "MOTION", year: "2025", description: "Motion graphics piece for Zoho Creator's Prediction feature. Clean, informative, on point.", color: C.cyan, videoId: "BnAAmL4VBS4" },
  { id: 7, title: "CONTRAST OF INDIA'S ECONOMY", category: "EDIT", year: "2025", description: "Visual breakdown of India's economic contrast. Data-driven storytelling with sharp edits.", color: C.yellow, videoId: "OYId41JQP3s" },
];

const SKILLS = ["After Effects", "Premiere Pro", "DaVinci Resolve", "Alight Motion", "Blender"];

const REELS = [
  { id: 1, title: "PREMIUM NAME CARD", format: "1x1", category: "MOTION", description: "Premium name card animation triggered after onboarding. Sleek reveal, luxury feel.", color: C.yellow, tags: ["ONBOARDING", "ANIMATION"], videoId: "S4z-SS2GPKQ" },
  { id: 2, title: "THE HIGHTABLE", format: "9x16", category: "MOTION", description: "Product video for TheHightable. Bold visuals, vertical-first design.", color: C.cyan, tags: ["PRODUCT", "VERTICAL"], videoId: "rjW5CqiadCw" },
  { id: 3, title: "DAN KOE STYLE MG", format: "9x16", category: "MOTION", description: "Dan Koe inspired motion graphics. Clean typography, punchy transitions.", color: C.yellow, tags: ["MOTION GRAPHICS", "STYLE"], videoId: "KO70icYXdbA" },
  { id: 4, title: "SPEEDRAMP EDIT", format: "9x16", category: "EDIT", description: "High-paced speedramp and transition edit. Blink and you'll miss it.", color: C.cyan, tags: ["SPEEDRAMP", "TRANSITIONS"], videoId: "zSrqumi6VPw" },
  { id: 5, title: "THE HUB BENGALURU", format: "9x16", category: "MOTION", description: "Clean motion graphics crafted for The Hub Bengaluru. Minimal, sharp, on brand.", color: C.yellow, tags: ["MOTION GRAPHICS", "BRANDING"], videoId: "aYH-AFVIx7Q" },
  { id: 6, title: "NEUBIE AD", format: "9x16", category: "MOTION", description: "Motion graphics ad for Neubie. Eye-catching visuals built to convert.", color: C.cyan, tags: ["AD", "MOTION GRAPHICS"], videoId: "b_yu-CnYddE" },
];

// Glitch text component
function GlitchText({ children, intensity = 1 }) {
  const [glitchText, setGlitchText] = useState(children);
  const [isGlitching, setIsGlitching] = useState(false);
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  const triggerGlitch = useCallback(() => {
    if (isGlitching) return;
    setIsGlitching(true);
    const original = typeof children === "string" ? children : "";
    let iterations = 0;
    const maxIterations = original.length * 2;
    const interval = setInterval(() => {
      setGlitchText(
        original.split("").map((char, i) => {
          if (char === " ") return " ";
          if (i < iterations / 2) return original[i];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      iterations++;
      if (iterations > maxIterations) {
        clearInterval(interval);
        setGlitchText(original);
        setIsGlitching(false);
      }
    }, 30 / intensity);
  }, [children, isGlitching, intensity]);

  return (
    <span onMouseEnter={triggerGlitch} style={{ cursor: "default" }}>
      {glitchText}
    </span>
  );
}

// Scanlines
function Scanlines() {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
      pointerEvents: "none", zIndex: 9999,
    }} />
  );
}

// Noise overlay
function Noise() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = 256; canvas.height = 256;
    let animId;
    const draw = () => {
      const imageData = ctx.createImageData(256, 256);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const v = Math.random() * 255;
        imageData.data[i] = v; imageData.data[i + 1] = v;
        imageData.data[i + 2] = v; imageData.data[i + 3] = 10;
      }
      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 9998, opacity: 0.5 }} />;
}

// Cursor
function CursorFollower() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  useEffect(() => {
    let animId;
    const animate = () => {
      setTrail((p) => ({ x: p.x + (pos.x - p.x) * 0.08, y: p.y + (pos.y - p.y) * 0.08 }));
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [pos]);
  return (
    <>
      <div className="cursor-ring" style={{
        position: "fixed", left: pos.x - 6, top: pos.y - 6, width: 12, height: 12,
        border: `1.5px solid ${C.yellow}`, borderRadius: "50%", pointerEvents: "none", zIndex: 10001,
        mixBlendMode: "difference",
      }} />
      <div className="cursor-trail" style={{
        position: "fixed", left: trail.x - 20, top: trail.y - 20, width: 40, height: 40,
        border: `1px solid ${C.cyan}40`, borderRadius: "50%", pointerEvents: "none", zIndex: 10000,
        mixBlendMode: "difference",
      }} />
    </>
  );
}

// Nav
function Nav({ activeSection, onNavigate }) {
  const links = [
    { label: "WORK", id: "work" },
    { label: "REELS & MOTION", id: "reels" },
    { label: "ABOUT", id: "about" },
    { label: "CONTACT", id: "contact" },
  ];
  return (
    <nav className="nav-pad" style={{
      position: "fixed", top: 0, left: 0, width: "100%",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      zIndex: 1000, mixBlendMode: "difference",
    }}>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "14px", letterSpacing: "4px", color: "#fff" }}>
        MD SAMI<span style={{ color: C.yellow }}>_</span>
      </div>
      <div className="nav-links" style={{ display: "flex", gap: "32px" }}>
        {links.map((link) => (
          <button key={link.id} onClick={() => onNavigate(link.id)}
            style={{
              background: "none", border: "none",
              color: activeSection === link.id ? C.cyan : "#fff",
              fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "3px",
              cursor: "pointer", position: "relative", padding: "4px 0",
            }}>
            {link.label}
            {activeSection === link.id && (
              <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "1px", background: C.cyan }} />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}

// Hero
function Hero({ onEnter }) {
  const [loaded, setLoaded] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCounter((c) => {
        if (c >= 100) { clearInterval(t); setTimeout(() => setLoaded(true), 300); return 100; }
        const next = c + Math.floor(Math.random() * 8) + 1;
        return next > 100 ? 100 : next;
      });
    }, 40);
    return () => clearInterval(t);
  }, []);

  if (!loaded) {
    return (
      <div style={{
        height: "100vh", background: C.bg, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", fontFamily: "'Space Mono', monospace",
      }}>
        <div style={{ fontSize: "72px", fontWeight: 700, color: "#fff", marginBottom: "20px" }}>
          {String(counter).padStart(3, "0")}<span style={{ color: C.yellow }}>%</span>
        </div>
        <div style={{ width: "200px", height: "2px", background: "#1a1a1a", overflow: "hidden" }}>
          <div style={{ width: `${counter}%`, height: "100%", background: `linear-gradient(90deg, ${C.yellow}, ${C.cyan})`, transition: "width 0.1s" }} />
        </div>
      </div>
    );
  }

  return (
    <section className="hero-pad" style={{
      height: "100vh", background: C.bg, position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column", justifyContent: "center",
    }}>
      {/* Grid lines */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.04 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`v${i}`} style={{ position: "absolute", left: `${(i + 1) * 5}%`, top: 0, width: "1px", height: "100%", background: "#fff" }} />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`h${i}`} style={{ position: "absolute", top: `${(i + 1) * 8.33}%`, left: 0, height: "1px", width: "100%", background: "#fff" }} />
        ))}
      </div>

      {/* Floating accent shapes */}
      <div style={{
        position: "absolute", top: "12%", right: "8%", width: "320px", height: "320px",
        border: `1px solid ${C.cyan}18`, borderRadius: "50%", animation: "spinSlow 20s linear infinite",
      }} />
      <div style={{
        position: "absolute", bottom: "18%", right: "22%", width: "160px", height: "160px",
        border: `1px solid ${C.yellow}15`, transform: "rotate(45deg)", animation: "floatUp 6s ease-in-out infinite",
      }} />
      {/* Cyberpunk glow blobs */}
      <div style={{
        position: "absolute", top: "30%", right: "5%", width: "500px", height: "500px",
        background: `radial-gradient(circle, ${C.cyan}06 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "5%", width: "400px", height: "400px",
        background: `radial-gradient(circle, ${C.yellow}06 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none",
      }} />

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 10, animation: "fadeSlideUp 1s ease-out forwards" }}>
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "6px",
          color: C.cyan, marginBottom: "24px",
        }}>
          MOTION DESIGN & VIDEO EDITING
        </div>

        <h1 style={{
          fontFamily: "'Clash Display', 'Space Grotesk', sans-serif", fontSize: "clamp(48px, 10vw, 130px)",
          fontWeight: 700, color: "#fff", lineHeight: 0.9, margin: 0, animation: "glitchIn 0.8s ease-out",
        }}>
          <span style={{ display: "block" }}><GlitchText>TURNING IDEAS</GlitchText></span>
          <span style={{ display: "block", WebkitTextStroke: "1.5px #fff", color: "transparent" }}>
            <GlitchText>INTO</GlitchText>
          </span>
          <span style={{
            display: "block",
            background: `linear-gradient(90deg, ${C.yellow}, ${C.cyan})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            <GlitchText>MOTION_</GlitchText>
          </span>
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginTop: "48px" }}>
          <button onClick={onEnter} style={{
            background: "transparent", border: `1px solid ${C.yellow}`, color: C.yellow,
            fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "3px",
            padding: "16px 32px", cursor: "pointer", transition: "all 0.3s",
          }}
            onMouseEnter={(e) => { e.target.style.background = C.yellow; e.target.style.color = C.black; }}
            onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = C.yellow; }}
          >
            VIEW WORK →
          </button>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: "11px", color: C.dim, letterSpacing: "2px",
          }}>
            SCROLL TO EXPLORE
          </span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bottom-bar" style={{
        position: "absolute", bottom: "24px", left: "20px", right: "20px",
        fontFamily: "'Space Mono', monospace", color: C.dim, letterSpacing: "2px", fontSize: "10px",
      }}>
        <span>BASED WORLDWIDE</span>
        <span style={{ color: C.cyan }}>AVAILABLE FOR FREELANCE</span>
        <span>© 2026</span>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: "60px", left: "50%", transform: "translateX(-50%)",
        animation: "pulse 2s ease-in-out infinite",
      }}>
        <div style={{ width: "1px", height: "40px", background: `linear-gradient(to bottom, transparent, ${C.yellow})` }} />
      </div>
    </section>
  );
}

// Marquee ribbon
function Marquee() {
  const text = "MD SAMI • MOTION DESIGN • VIDEO EDITING • TURNING IDEAS INTO MOTION • ";
  return (
    <div style={{
      background: `linear-gradient(90deg, ${C.yellow}, ${C.cyan})`,
      padding: "12px 0", overflow: "hidden", whiteSpace: "nowrap",
    }}>
      <div style={{
        display: "inline-block", animation: "marquee 20s linear infinite",
        fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "4px",
        color: C.black, fontWeight: 700,
      }}>
        {text.repeat(10)}
      </div>
    </div>
  );
}

// Project card
function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const isEven = index % 2 === 0;
  const hasVideo = project.videoId && project.videoId !== "" && !project.videoId.startsWith("YOUR_");
  const thumbUrl = hasVideo ? `https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg` : null;

  const handlePlay = () => {
    if (hasVideo) window.open(`https://www.youtube.com/watch?v=${project.videoId}`, "_blank");
  };

  return (
    <div
      className="project-card-grid"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "60px 0", borderBottom: `1px solid ${C.dimmer}`,
        cursor: "pointer", direction: isEven ? "ltr" : "rtl",
        animation: `fadeSlideUp 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      <div
        onClick={handlePlay}
        style={{
          aspectRatio: "16/9", background: "#0c0c0e", position: "relative", overflow: "hidden",
          border: hovered ? `1px solid ${project.color}` : `1px solid ${C.dimmer}`, transition: "border 0.3s",
        }}
      >
        {/* YouTube thumbnail background */}
        {hasVideo && (
          <img
            src={thumbUrl}
            alt=""
            onLoad={() => setImgLoaded(true)}
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", opacity: imgLoaded ? (hovered ? 0.6 : 0.3) : 0,
              transition: "opacity 0.4s", filter: "brightness(0.7) contrast(1.1)",
            }}
          />
        )}

        {/* Animated bars (show when no thumb or as overlay) */}
        {(!hasVideo || !imgLoaded) && Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute", bottom: 0, left: `${i * 12.5}%`, width: "12.5%",
            height: hovered ? `${30 + Math.random() * 70}%` : "0%",
            background: `${project.color}${hovered ? "12" : "00"}`, transition: `height ${0.4 + i * 0.05}s ease-out`,
          }} />
        ))}

        {/* Play button overlay */}
        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "8px", zIndex: 2,
        }}>
          <div style={{
            width: "56px", height: "56px",
            border: `1.5px solid ${hovered ? project.color : "rgba(255,255,255,0.15)"}`,
            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.3s", transform: hovered ? "scale(1.15)" : "scale(1)",
            background: hovered ? `${project.color}20` : "rgba(0,0,0,0.4)",
            backdropFilter: "blur(4px)",
          }}>
            <div style={{
              width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent",
              borderLeft: `14px solid ${hovered ? project.color : "rgba(255,255,255,0.3)"}`,
              marginLeft: "4px", transition: "border-color 0.3s",
            }} />
          </div>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "3px",
            color: hovered ? project.color : "rgba(255,255,255,0.2)", transition: "color 0.3s",
          }}>
            {hasVideo ? "WATCH" : "COMING SOON"}
          </span>
        </div>

        {/* Corner brackets */}
        <div style={{ position: "absolute", top: 8, left: 8, width: 16, height: 16, borderTop: `1px solid ${project.color}30`, borderLeft: `1px solid ${project.color}30`, zIndex: 3 }} />
        <div style={{ position: "absolute", bottom: 8, right: 8, width: 16, height: 16, borderBottom: `1px solid ${project.color}30`, borderRight: `1px solid ${project.color}30`, zIndex: 3 }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", direction: "ltr", padding: "0 20px" }}>
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "4px",
          color: project.color, marginBottom: "12px", opacity: 0.7,
        }}>
          {project.category} — {project.year}
        </div>
        <h3 style={{
          fontFamily: "'Clash Display', 'Space Grotesk', sans-serif", fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: 700, color: "#fff", margin: "0 0 16px 0", lineHeight: 1,
          transform: hovered ? "translateX(10px)" : "translateX(0)", transition: "transform 0.4s ease-out",
        }}>
          {project.title}
        </h3>
        <p style={{
          fontFamily: "'Space Mono', monospace", fontSize: "12px", lineHeight: 1.8,
          color: "rgba(255,255,255,0.35)", margin: 0, maxWidth: "360px",
        }}>
          {project.description}
        </p>
        <div style={{
          marginTop: "24px", fontFamily: "'Space Mono', monospace", fontSize: "10px",
          letterSpacing: "3px", color: hovered ? project.color : C.dim, transition: "color 0.3s",
        }}>
          {hasVideo ? "WATCH PROJECT →" : "VIEW PROJECT →"}
        </div>
      </div>
    </div>
  );
}

// Clients section — infinite sliding marquee
const CLIENTS = ["CapMint", "Yaas", "AirTribe", "The Hub Bengaluru", "Zoho", "Zerodha", "FoodieBee"];

function ClientName({ name, index, direction }) {
  const [hovered, setHovered] = useState(false);
  const color = index % 2 === 0 ? C.yellow : C.cyan;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: "20px",
        padding: "0 40px", flexShrink: 0, cursor: "default",
      }}
    >
      {/* Decorative diamond */}
      <div style={{
        width: "6px", height: "6px", background: hovered ? color : "rgba(255,255,255,0.1)",
        transform: "rotate(45deg)", transition: "background 0.3s", flexShrink: 0,
      }} />
      <span style={{
        fontFamily: "'Clash Display', 'Space Grotesk', sans-serif",
        fontSize: "clamp(24px, 4vw, 42px)",
        fontWeight: 700,
        letterSpacing: "3px",
        color: hovered ? color : "rgba(255,255,255,0.15)",
        transition: "color 0.4s, text-shadow 0.4s",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        textShadow: hovered ? `0 0 30px ${color}30` : "none",
      }}>
        {name}
      </span>
    </div>
  );
}

function ClientSlider({ direction = "left", speed = 30 }) {
  const animName = direction === "left" ? "slideLeft" : "slideRight";
  return (
    <div style={{
      overflow: "hidden", width: "100%", position: "relative",
      maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
    }}>
      <div style={{
        display: "flex", width: "fit-content",
        animation: `${animName} ${speed}s linear infinite`,
      }}>
        {/* Repeat 4 times for seamless loop */}
        {[...Array(4)].map((_, setIdx) =>
          CLIENTS.map((name, i) => (
            <ClientName key={`${setIdx}-${name}`} name={name} index={i} direction={direction} />
          ))
        )}
      </div>
    </div>
  );
}

function Clients() {
  return (
    <section style={{
      background: C.bgAlt, position: "relative",
      padding: "80px 0",
      borderTop: `1px solid ${C.dimmer}`,
      borderBottom: `1px solid ${C.dimmer}`,
      overflow: "hidden",
    }}>
      {/* Subtle glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: "800px", height: "400px",
        background: `radial-gradient(ellipse, ${C.cyan}04 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "48px", position: "relative" }}>
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "6px",
          color: C.cyan, marginBottom: "12px",
        }}>
          TRUSTED BY
        </div>
        <h2 style={{
          fontFamily: "'Clash Display', 'Space Grotesk', sans-serif",
          fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 700, color: "#fff",
          margin: 0, lineHeight: 1,
        }}>
          <GlitchText>BRANDS I'VE WORKED WITH_</GlitchText>
        </h2>
      </div>

      {/* Row 1 — slides left */}
      <div style={{ marginBottom: "16px" }}>
        <ClientSlider direction="left" speed={35} />
      </div>

      {/* Divider line */}
      <div style={{
        width: "100%", height: "1px",
        background: `linear-gradient(90deg, transparent, ${C.yellow}15, ${C.cyan}15, transparent)`,
        marginBottom: "16px",
      }} />

      {/* Row 2 — slides right (reversed order for variety) */}
      <div>
        <ClientSlider direction="right" speed={40} />
      </div>
    </section>
  );
}

// Work section
function Work() {
  const [filter, setFilter] = useState("ALL");
  const filtered = filter === "ALL" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="work" className="section-pad" style={{ background: C.bg, position: "relative" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="section-header" style={{
          marginBottom: "60px",
        }}>
          <div>
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "6px",
              color: C.cyan, marginBottom: "12px",
            }}>
              SELECTED PROJECTS
            </div>
            <h2 style={{
              fontFamily: "'Clash Display', 'Space Grotesk', sans-serif", fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1,
            }}>
              <GlitchText>WORK_</GlitchText>
            </h2>
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            {["ALL", "MOTION", "EDIT"].map((f) => (
              <button key={f} onClick={() => setFilter(f)} style={{
                background: filter === f ? C.yellow : "transparent",
                border: `1px solid ${filter === f ? C.yellow : C.dimmer}`,
                color: filter === f ? C.black : "rgba(255,255,255,0.4)",
                fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "2px",
                padding: "8px 20px", cursor: "pointer", transition: "all 0.3s", fontWeight: filter === f ? 700 : 400,
              }}>
                {f}
              </button>
            ))}
          </div>
        </div>
        {filtered.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

// Reel card
function ReelCard({ reel, index }) {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const is916 = reel.format === "9x16";
  const hasVideo = reel.videoId && reel.videoId !== "" && !reel.videoId.startsWith("YOUR_");
  const thumbUrl = hasVideo ? `https://img.youtube.com/vi/${reel.videoId}/hqdefault.jpg` : null;

  const handlePlay = () => {
    if (hasVideo) window.open(`https://www.youtube.com/watch?v=${reel.videoId}`, "_blank");
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", cursor: "pointer", animation: `fadeSlideUp 0.5s ease-out ${index * 0.08}s both` }}
    >
      <div onClick={handlePlay} style={{
        aspectRatio: is916 ? "9/16" : "1/1", background: "#0c0c0e", position: "relative", overflow: "hidden",
        border: hovered ? `1px solid ${reel.color}` : `1px solid ${C.dimmer}`,
        transition: "border 0.3s, transform 0.4s", transform: hovered ? "scale(0.97)" : "scale(1)",
      }}>
        {hasVideo && (
          <img src={thumbUrl} alt="" onLoad={() => setImgLoaded(true)} style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", opacity: imgLoaded ? (hovered ? 0.6 : 0.3) : 0,
            transition: "opacity 0.4s", filter: "brightness(0.7) contrast(1.1)",
          }} />
        )}
        <div style={{
          position: "absolute", inset: 0,
          background: hovered ? `repeating-linear-gradient(45deg, transparent, transparent 8px, ${reel.color}08 8px, ${reel.color}08 16px)` : "none",
        }} />
        {hovered && Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute", top: `${15 + i * 22}%`, left: 0, width: "100%", height: "2px",
            background: `${reel.color}30`, animation: `glitchBar 0.3s ease-out ${i * 0.05}s`,
          }} />
        ))}
        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "12px", zIndex: 2,
        }}>
          <div style={{
            width: "48px", height: "48px", border: `1.5px solid ${hovered ? reel.color : "rgba(255,255,255,0.1)"}`,
            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.3s", transform: hovered ? "scale(1.1)" : "scale(1)",
            background: hovered ? `${reel.color}15` : "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)",
          }}>
            <div style={{
              width: 0, height: 0, borderTop: "7px solid transparent", borderBottom: "7px solid transparent",
              borderLeft: `12px solid ${hovered ? reel.color : "rgba(255,255,255,0.2)"}`,
              marginLeft: "3px", transition: "border-color 0.3s",
            }} />
          </div>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "3px",
            color: hovered ? reel.color : "rgba(255,255,255,0.12)", transition: "color 0.3s",
          }}>{reel.format}</span>
        </div>
        <div style={{ position: "absolute", top: 6, left: 6, width: 12, height: 12, borderTop: `1px solid ${reel.color}25`, borderLeft: `1px solid ${reel.color}25`, zIndex: 3 }} />
        <div style={{ position: "absolute", top: 6, right: 6, width: 12, height: 12, borderTop: `1px solid ${reel.color}25`, borderRight: `1px solid ${reel.color}25`, zIndex: 3 }} />
        <div style={{ position: "absolute", bottom: 6, left: 6, width: 12, height: 12, borderBottom: `1px solid ${reel.color}25`, borderLeft: `1px solid ${reel.color}25`, zIndex: 3 }} />
        <div style={{ position: "absolute", bottom: 6, right: 6, width: 12, height: 12, borderBottom: `1px solid ${reel.color}25`, borderRight: `1px solid ${reel.color}25`, zIndex: 3 }} />
      </div>
      <div style={{ padding: "14px 0 0 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
          <span style={{
            fontFamily: "'Clash Display', 'Space Grotesk', sans-serif", fontSize: "15px", fontWeight: 700,
            color: hovered ? "#fff" : "rgba(255,255,255,0.6)", transition: "color 0.3s",
          }}>{reel.title}</span>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: "2px",
            color: reel.color, opacity: 0.5,
          }}>{reel.category}</span>
        </div>
        <p style={{
          fontFamily: "'Space Mono', monospace", fontSize: "10px", lineHeight: 1.7,
          color: "rgba(255,255,255,0.25)", margin: "0 0 8px 0",
        }}>{reel.description}</p>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {reel.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: "1.5px",
              color: hovered ? reel.color : "rgba(255,255,255,0.15)",
              border: `1px solid ${hovered ? reel.color + "35" : "rgba(255,255,255,0.05)"}`,
              padding: "3px 8px", transition: "all 0.3s",
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Reels section
function Reels() {
  const [format, setFormat] = useState("ALL");
  const filtered = format === "ALL" ? REELS : REELS.filter((r) => r.format === format);

  return (
    <section id="reels" className="section-pad" style={{
      background: C.bgAlt, position: "relative",
      borderTop: `1px solid ${C.dimmer}`,
    }}>
      <div style={{
        position: "absolute", top: "50%", left: "-10%", width: "400px", height: "400px",
        background: `radial-gradient(circle, ${C.cyan}05 0%, transparent 70%)`,
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "20%", right: "-5%", width: "350px", height: "350px",
        background: `radial-gradient(circle, ${C.yellow}04 0%, transparent 70%)`,
        borderRadius: "50%", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
        <div className="section-header" style={{
          marginBottom: "60px",
        }}>
          <div>
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "6px",
              color: C.yellow, marginBottom: "12px",
            }}>
              SHORT FORMAT / MOTION DESIGNS
            </div>
            <h2 style={{
              fontFamily: "'Clash Display', 'Space Grotesk', sans-serif",
              fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1,
            }}>
              <GlitchText>REELS & MOTION_</GlitchText>
            </h2>
          </div>

          <div style={{ display: "flex", gap: "0px", border: `1px solid ${C.dimmer}` }}>
            {["ALL", "9x16", "1x1"].map((f, i) => (
              <button key={f} onClick={() => setFormat(f)} style={{
                background: format === f ? C.cyan : "transparent",
                border: "none",
                borderRight: i < 2 ? `1px solid ${C.dimmer}` : "none",
                color: format === f ? C.black : "rgba(255,255,255,0.4)",
                fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "2px",
                padding: "10px 24px", cursor: "pointer", transition: "all 0.3s",
                fontWeight: format === f ? 700 : 400,
              }}>
                {f === "9x16" ? "9:16" : f === "1x1" ? "1:1" : f}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "2px",
          color: C.dim, marginBottom: "40px", paddingBottom: "20px",
          borderBottom: `1px solid ${C.dimmer}`,
        }}>
          {format === "9x16" && "VERTICAL — INSTAGRAM REELS / YOUTUBE SHORTS"}
          {format === "1x1" && "SQUARE — INSTAGRAM POSTS / SOCIAL CAMPAIGNS / LOOPS"}
          {format === "ALL" && `SHOWING ${REELS.length} PIECES — ALL FORMATS`}
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: format === "9x16"
            ? "repeat(auto-fill, minmax(200px, 1fr))"
            : format === "1x1"
              ? "repeat(auto-fill, minmax(260px, 1fr))"
              : "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "24px",
        }}>
          {filtered.map((reel, i) => (
            <ReelCard key={reel.id} reel={reel} index={i} />
          ))}
        </div>

        <div style={{
          textAlign: "center", marginTop: "64px",
          fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "3px", color: C.dim,
        }}>
          MORE ON{" "}
          <a href="https://www.instagram.com/_s6mii/" target="_blank" rel="noopener" style={{ color: C.yellow, textDecoration: "none", borderBottom: `1px solid ${C.yellow}40`, paddingBottom: "2px" }}>INSTAGRAM</a>
          {" "}&{" "}
          <a href="https://www.linkedin.com/in/mohammad-sami-158870310/" target="_blank" rel="noopener" style={{ color: C.cyan, textDecoration: "none", borderBottom: `1px solid ${C.cyan}40`, paddingBottom: "2px" }}>LINKEDIN</a>
        </div>
      </div>
    </section>
  );
}

// Skill bar
function SkillBar({ skill, index }) {
  const [hovered, setHovered] = useState(false);
  const widths = [98, 90, 87, 100, 70];
  const color = index % 2 === 0 ? C.yellow : C.cyan;
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        padding: "16px 0", borderBottom: `1px solid ${C.dimmer}`, cursor: "default",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
      <span style={{
        fontFamily: "'Space Mono', monospace", fontSize: "12px", letterSpacing: "2px",
        color: hovered ? color : "rgba(255,255,255,0.4)", transition: "color 0.3s",
      }}>
        {skill}
      </span>
      <div style={{ width: "120px", height: "2px", background: C.dimmer }}>
        <div style={{
          width: hovered ? `${widths[index]}%` : "0%", height: "100%",
          background: `linear-gradient(90deg, ${C.yellow}, ${C.cyan})`, transition: "width 0.6s ease-out",
        }} />
      </div>
    </div>
  );
}

// About section
function About() {
  return (
    <section id="about" className="section-pad" style={{ background: "#050507", position: "relative" }}>
      <div className="about-grid" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "6px",
            color: C.yellow, marginBottom: "12px",
          }}>ABOUT</div>
          <h2 style={{
            fontFamily: "'Clash Display', 'Space Grotesk', sans-serif", fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 700, color: "#fff", margin: "0 0 32px 0", lineHeight: 1,
          }}>
            <GlitchText>IDEAS INTO</GlitchText><br />
            <span style={{
              background: `linear-gradient(90deg, ${C.yellow}, ${C.cyan})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              <GlitchText>MOTION_</GlitchText>
            </span>
          </h2>
          <p style={{
            fontFamily: "'Space Mono', monospace", fontSize: "13px", lineHeight: 2,
            color: "rgba(255,255,255,0.35)", margin: "0 0 24px 0",
          }}>
            I'm Md Sami — a motion designer & video editor obsessed with pushing visual boundaries.
            Every frame is a chance to break rules, challenge perception, and create something
            that demands attention.
          </p>
          <p style={{
            fontFamily: "'Space Mono', monospace", fontSize: "13px", lineHeight: 2,
            color: "rgba(255,255,255,0.35)", margin: 0,
          }}>
            From product launch films to experimental motion pieces, I bring controlled chaos to every project.
            If you want safe, I'm not your guy. If you want unforgettable — let's talk.
          </p>
        </div>
        <div>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "6px",
            color: C.dim, marginBottom: "32px",
          }}>TOOLKIT</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {SKILLS.map((skill, i) => <SkillBar key={skill} skill={skill} index={i} />)}
          </div>
          <div className="stats-grid" style={{ marginTop: "48px" }}>
            {[
              { num: "50+", label: "PROJECTS" },
              { num: "8+", label: "YEARS" },
              { num: "30+", label: "CLIENTS" },
            ].map(({ num, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "'Clash Display', 'Space Grotesk', sans-serif", fontSize: "36px", fontWeight: 700,
                  background: `linear-gradient(135deg, ${C.yellow}, ${C.cyan})`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>{num}</div>
                <div style={{
                  fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "3px",
                  color: C.dim, marginTop: "4px",
                }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact section
function Contact() {
  return (
    <section id="contact" className="section-pad" style={{
      background: C.bg, position: "relative",
      borderTop: `1px solid ${C.dimmer}`,
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "6px",
          color: C.cyan, marginBottom: "24px",
        }}>GET IN TOUCH</div>
        <h2 style={{
          fontFamily: "'Clash Display', 'Space Grotesk', sans-serif", fontSize: "clamp(36px, 8vw, 96px)",
          fontWeight: 700, color: "#fff", margin: "0 0 16px 0", lineHeight: 1,
        }}>
          <GlitchText>LET'S CREATE</GlitchText>
        </h2>
        <h2 style={{
          fontFamily: "'Clash Display', 'Space Grotesk', sans-serif", fontSize: "clamp(36px, 8vw, 96px)",
          fontWeight: 700, margin: "0 0 48px 0", lineHeight: 1,
          background: `linear-gradient(90deg, ${C.yellow}, ${C.cyan})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          <GlitchText>TOGETHER_</GlitchText>
        </h2>

        <a href="mailto:samivisuals12@gmail.com" style={{
          display: "inline-block", fontFamily: "'Space Mono', monospace", fontSize: "14px",
          letterSpacing: "4px", color: C.yellow, textDecoration: "none",
          border: `1px solid ${C.yellow}`, padding: "20px 48px", transition: "all 0.3s",
        }}
          onMouseEnter={(e) => { e.target.style.background = C.yellow; e.target.style.color = C.black; }}
          onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = C.yellow; }}
        >
          SAMIVISUALS12@GMAIL.COM
        </a>

        <div className="social-row" style={{ marginTop: "64px" }}>
          {[
            { name: "INSTAGRAM", url: "https://www.instagram.com/_s6mii/" },
            { name: "LINKEDIN", url: "https://www.linkedin.com/in/mohammad-sami-158870310/" },
          ].map((s, i) => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener" style={{
              fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "3px",
              color: C.dim, textDecoration: "none", transition: "color 0.3s",
            }}
              onMouseEnter={(e) => e.target.style.color = i % 2 === 0 ? C.yellow : C.cyan}
              onMouseLeave={(e) => e.target.style.color = C.dim}
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>

      <div style={{
        marginTop: "120px", paddingTop: "24px", borderTop: `1px solid ${C.dimmer}`,
        display: "flex", justifyContent: "space-between",
        fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "2px",
        color: "rgba(255,255,255,0.12)",
      }}>
        <span>MD SAMI<span style={{ color: C.yellow }}>_</span> © 2026</span>
        <span>TURNING IDEAS INTO <span style={{ color: C.cyan }}>MOTION</span></span>
      </div>
    </section>
  );
}

// Main App
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("work");
  const handleNavigate = (section) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", cursor: "none", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; cursor: none !important; }
        html { scroll-behavior: smooth; }
        body { background: ${C.bg}; overflow-x: hidden; }
        ::selection { background: ${C.yellow}; color: ${C.black}; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(${C.yellow}, ${C.cyan}); }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glitchIn {
          0% { clip-path: inset(40% 0 60% 0); transform: skewX(-10deg); }
          20% { clip-path: inset(10% 0 80% 0); transform: skewX(5deg); }
          40% { clip-path: inset(70% 0 5% 0); transform: skewX(-3deg); }
          60% { clip-path: inset(20% 0 30% 0); transform: skewX(2deg); }
          80%, 100% { clip-path: inset(0); transform: skewX(0); }
        }
        @keyframes spinSlow { to { transform: rotate(360deg); } }
        @keyframes floatUp {
          0%, 100% { transform: rotate(45deg) translateY(0); }
          50% { transform: rotate(45deg) translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes glitchBar {
          0% { transform: scaleX(0); opacity: 0; }
          50% { transform: scaleX(1.2); opacity: 1; }
          100% { transform: scaleX(1); opacity: 0.6; }
        }
        @keyframes slideLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @keyframes slideRight {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(0); }
        }

        /* RESPONSIVE */
        .project-card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
        .section-pad { padding: 120px 40px; }
        .hero-pad { padding: 0 40px; }
        .nav-pad { padding: 24px 40px; }
        .bottom-bar { display: flex; justify-content: space-between; font-size: 10px; }
        .social-row { display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; }
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; }
        .section-header { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 20px; }
        .cursor-ring, .cursor-trail { display: block; }

        @media (max-width: 768px) {
          .project-card-grid { grid-template-columns: 1fr !important; direction: ltr !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .section-pad { padding: 72px 20px !important; }
          .hero-pad { padding: 0 20px !important; }
          .nav-pad { padding: 16px 20px !important; }
          .bottom-bar { flex-direction: column; gap: 8px; align-items: center; text-align: center; }
          .social-row { gap: 20px; }
          .stats-grid { grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
          .section-header { flex-direction: column; align-items: flex-start !important; }
          .cursor-ring, .cursor-trail { display: none !important; }
          body { cursor: auto !important; }
          * { cursor: auto !important; }
        }

        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr; gap: 20px; }
          .nav-links { gap: 16px !important; }
        }
      `}</style>

      <CursorFollower />
      <Scanlines />
      <Noise />
      <Nav activeSection={activeSection} onNavigate={handleNavigate} />
      <Hero onEnter={() => handleNavigate("work")} />
      <Marquee />
      <Clients />
      <Work />
      <Reels />
      <About />
      <Contact />
    </div>
  );
}
