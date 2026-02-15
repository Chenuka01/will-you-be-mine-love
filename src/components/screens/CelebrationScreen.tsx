import React, { useEffect, useState } from "react";
import { ValentineButton } from "@/components/ui/valentine-button";
import { Switch } from "@/components/ui/switch";
import FloatingHearts from "@/components/FloatingHearts";
import Confetti from "@/components/Confetti";
import RosePetals from "@/components/RosePetals";

const CelebrationScreen: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [petalsEnabled, setPetalsEnabled] = useState(true);

  useEffect(() => {
    // Refresh confetti periodically
    const interval = setInterval(() => {
      setShowConfetti(false);
      setTimeout(() => setShowConfetti(true), 100);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // initialize petals preference & respect prefers-reduced-motion
  useEffect(() => {
    try {
      const stored = localStorage.getItem("petalsEnabled");
      if (stored !== null) {
        setPetalsEnabled(JSON.parse(stored));
        return;
      }
    } catch (e) {
      /* ignore */
    }

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPetalsEnabled(false);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("petalsEnabled", JSON.stringify(petalsEnabled));
    } catch (e) {
      /* ignore */
    }
  }, [petalsEnabled]);

  return (
    <div className="min-h-screen bg-celebration-gradient flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <FloatingHearts intensity="celebration" />
      {showConfetti && <Confetti />}
      <RosePetals intensity="celebration" enabled={petalsEnabled} />
      
      <div className="z-10 text-center animate-fade-in-up">
        <div className="text-7xl mb-4">
          <span className="rose-core animate-bounce-soft" aria-hidden>🌹</span>
        </div>
        
        <h1 className="font-display text-5xl md:text-7xl text-foreground mb-6">
          YAYYYYY
        </h1>
        
        <div className="text-4xl mb-6 flex justify-center gap-2">
          <span className="animate-pulse-heart">💖</span>
          <span className="animate-pulse-heart" style={{ animationDelay: "0.2s" }}>💕</span>
          <span className="animate-pulse-heart" style={{ animationDelay: "0.4s" }}>💝</span>
        </div>
        
        <div className="bg-card/90 backdrop-blur-sm rounded-3xl p-8 shadow-float mb-8 max-w-md mx-auto">
          <p className="font-body text-xl text-foreground mb-2">
            You are officially, legally, emotionally
          </p>
          <p className="font-display text-4xl text-primary mb-4">
            MY VALENTINE 💖
          </p>
          <div className="text-muted-foreground text-sm space-y-1">
            <p>No refunds.</p>
            <p>No returns.</p>
            <p className="font-semibold">Valentine status is permanent.</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <ValentineButton
            variant="celebration"
            size="lg"
            onClick={() => {}}
          >
            💕 Okay fine I love you
          </ValentineButton>
          <ValentineButton
            variant="soft"
            size="lg"
            onClick={() => {
              // Try to trigger screenshot or just show a message
              alert("Take a screenshot of this moment! 📸💕");
            }}
          >
            📸 Screenshot this
          </ValentineButton>
        </div>

        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-sm text-muted-foreground">Petals</span>
          <Switch
            checked={petalsEnabled}
            onCheckedChange={(v) => setPetalsEnabled(Boolean(v))}
            aria-label="Toggle rose petals"
          />
          <span className="sr-only">Toggle rose petals</span>
        </div>

        <p className="text-muted-foreground text-sm italic">
          Best decision you made today 😌
        </p>
      </div>
    </div>
  );
};

export default CelebrationScreen;
