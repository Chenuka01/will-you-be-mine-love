import React, { useEffect, useState } from "react";

interface Heart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

interface FloatingHeartsProps {
  intensity?: "low" | "medium" | "high" | "celebration";
}

const FloatingHearts: React.FC<FloatingHeartsProps> = ({ intensity = "medium" }) => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  const heartCount = {
    low: 5,
    medium: 10,
    high: 20,
    celebration: 40,
  }[intensity];

  useEffect(() => {
    const newHearts: Heart[] = [];
    for (let i = 0; i < heartCount; i++) {
      newHearts.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 4,
        size: 12 + Math.random() * 24,
      });
    }
    setHearts(newHearts);
  }, [heartCount]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-primary opacity-60"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animation: `heart-float ${heart.duration}s ease-in-out ${heart.delay}s infinite`,
          }}
        >
          💕
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
