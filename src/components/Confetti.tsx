import React, { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  rotation: number;
}

const Confetti: React.FC = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  const colors = [
    "hsl(346, 77%, 65%)",
    "hsl(350, 100%, 85%)",
    "hsl(45, 100%, 60%)",
    "hsl(16, 100%, 70%)",
    "hsl(350, 100%, 96%)",
    "hsl(280, 80%, 75%)",
  ];

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

    const count = prefersReduced ? 12 : 100;
    const newPieces: ConfettiPiece[] = [];
    for (let i = 0; i < count; i++) {
      newPieces.push({
        id: i,
        left: Math.random() * 100,
        delay: prefersReduced ? 0 : Math.random() * 2,
        duration: prefersReduced ? 0.8 + Math.random() * 0.8 : 2 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: prefersReduced ? 6 + Math.random() * 6 : 8 + Math.random() * 12,
        rotation: Math.random() * 360,
      });
    }
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: piece.id % 3 === 0 ? "50%" : piece.id % 3 === 1 ? "0" : "50% 0",
            transform: `rotate(${piece.rotation}deg)`,
            animation: `confetti-fall ${piece.duration}s ease-out ${piece.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
