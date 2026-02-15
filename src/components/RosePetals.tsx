import React, { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  colorA: string;
  colorB: string;
}

interface RosePetalsProps {
  intensity?: "low" | "medium" | "high" | "celebration";
  enabled?: boolean;
}

const RosePetals: React.FC<RosePetalsProps> = ({ intensity = "medium", enabled = true }) => {
  const [petals, setPetals] = useState<Petal[]>([]);
  const uid = React.useId();

  const baseCount = {
    low: 8,
    medium: 20,
    high: 40,
    celebration: 80,
  }[intensity];

  useEffect(() => {
    if (!enabled) {
      setPetals([]);
      return;
    }

    const prefersReduced = typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

    const count = prefersReduced ? Math.max(6, Math.floor(baseCount / 6)) : baseCount;

    const pieces: Petal[] = [];
    for (let i = 0; i < count; i++) {
      const size = 10 + Math.random() * 30;
      pieces.push({
        id: i,
        left: Math.random() * 100,
        delay: prefersReduced ? 0 : Math.random() * 3,
        duration: prefersReduced ? 0 : 3 + Math.random() * 4,
        size,
        rotation: Math.random() * 360,
        colorA: `hsl(346 85% ${28 + Math.random() * 18}%)`,
        colorB: `hsl(346 70% ${38 + Math.random() * 18}%)`,
      });
    }
    setPetals(pieces);
  }, [baseCount, enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40" aria-hidden>
      {petals.map((p) => {
        const gradId = `${uid}-g-${p.id}`;
        const fallAnim = p.duration > 0 ? `petal-fall ${p.duration}s cubic-bezier(.2,.8,.2,1) ${p.delay}s forwards` : "none";
        const swayDuration = 1.6 + (p.id % 4) * 0.6;
        const swayAnim = p.duration > 0 ? `petal-sway ${swayDuration}s ease-in-out ${p.delay}s infinite` : "none";

        return (
          <svg
            key={p.id}
            className="absolute rose-petal"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size * 0.65}px`,
              transform: `rotate(${p.rotation}deg)`,
              animation: `${fallAnim}, ${swayAnim}`,
              opacity: 0,
              filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.22))",
            }}
            viewBox="0 0 100 65"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-hidden
          >
            <defs>
              <linearGradient id={gradId} x1="10%" y1="10%" x2="90%" y2="90%">
                <stop offset="0%" stopColor={p.colorA} />
                <stop offset="100%" stopColor={p.colorB} />
              </linearGradient>
            </defs>
            <path
              d="M50 3 C70 3 88 18 78 38 C68 58 32 58 22 38 C12 18 30 3 50 3 Z"
              fill={`url(#${gradId})`}
              transform="translate(0,0)"
            />
          </svg>
        );
      })}
    </div>
  );
};

export default RosePetals;
