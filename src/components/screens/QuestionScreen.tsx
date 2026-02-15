import React, { useState, useRef, useCallback, useEffect } from "react";
import { ValentineButton } from "@/components/ui/valentine-button";
import FloatingHearts from "@/components/FloatingHearts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface QuestionScreenProps {
  onYes: () => void;
  onChaosMode: () => void;
  onFallback: () => void;
}

const PHASE_THRESHOLDS = {
  shy: 2,
  playful: 5,
  dramatic: 8,
  emotional: 12,
};

const TOOLTIPS = {
  shy: ["Hehe 🤭", "Not today", "Try again", "Nopeee"],
  playful: ["Too slow 😛", "Almost!", "You missed", "Haha nope"],
  dramatic: ["STOP TRYING 😭", "This is bullying", "I'm scared", "Leave me alone"],
  emotional: ["I'm broken", "Wrong button", "Pick the other one 😔", "Please stop 🥺"],
};

const HELPER_TEXTS = {
  shy: "Choose wisely.",
  playful: "Why are you chasing it?",
  dramatic: "That button is clearly stressed.",
  emotional: "I think it's not working. Maybe try YES?",
};

const QuestionScreen: React.FC<QuestionScreenProps> = ({ onYes, onChaosMode, onFallback }) => {
  const [attempts, setAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [tooltip, setTooltip] = useState("");
  const [isPositioned, setIsPositioned] = useState(false);
  const [chaosActivated, setChaosActivated] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [showBetrayalPopup, setShowBetrayalPopup] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout>();

  const getPhase = () => {
    if (attempts <= PHASE_THRESHOLDS.shy) return "shy";
    if (attempts <= PHASE_THRESHOLDS.playful) return "playful";
    if (attempts <= PHASE_THRESHOLDS.dramatic) return "dramatic";
    return "emotional";
  };

  const phase = getPhase();

  // Inactivity fallback trigger
  useEffect(() => {
    if (chaosActivated) {
      inactivityTimerRef.current = setInterval(() => {
        const now = Date.now();
        if (now - lastInteraction > 6000) {
          onFallback();
        }
      }, 1000);
    }
    return () => {
      if (inactivityTimerRef.current) {
        clearInterval(inactivityTimerRef.current);
      }
    };
  }, [chaosActivated, lastInteraction, onFallback]);

  const moveNoButton = useCallback(() => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();
    
    const maxX = container.width - button.width - 40;
    const maxY = container.height - button.height - 100;
    
    let newX, newY;
    
    if (phase === "shy") {
      // Small displacement
      const currentX = noPosition.x || container.width / 2;
      const currentY = noPosition.y || container.height / 2;
      newX = Math.max(20, Math.min(maxX, currentX + (Math.random() - 0.5) * 100));
      newY = Math.max(100, Math.min(maxY, currentY + (Math.random() - 0.5) * 100));
    } else if (phase === "emotional") {
      // Hide in corners
      const corners = [
        { x: 20, y: 100 },
        { x: maxX, y: 100 },
        { x: 20, y: maxY },
        { x: maxX, y: maxY },
      ];
      const corner = corners[Math.floor(Math.random() * corners.length)];
      newX = corner.x;
      newY = corner.y;
    } else {
      // Random jumps
      newX = 20 + Math.random() * maxX;
      newY = 100 + Math.random() * (maxY - 100);
    }

    setNoPosition({ x: newX, y: newY });
    setIsPositioned(true);
    
    // Show tooltip
    const tooltips = TOOLTIPS[phase];
    setTooltip(tooltips[Math.floor(Math.random() * tooltips.length)]);
    
    // Hide tooltip after a moment
    setTimeout(() => setTooltip(""), 1500);
  }, [phase, noPosition]);

  const handleNoInteraction = () => {
    setLastInteraction(Date.now());
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    // Trigger chaos mode
    if (newAttempts >= 7 && !chaosActivated) {
      setChaosActivated(true);
      onChaosMode();
    }

    // Betrayal Mode: 40% chance to show popup during chaos mode
    if (chaosActivated && Math.random() < 0.4) {
      setShowBetrayalPopup(true);
      return;
    }

    moveNoButton();
  };

  const getButtonSize = () => {
    if (phase === "emotional") return "sm";
    if (phase === "dramatic") return "default";
    return "lg";
  };

  const getButtonAnimation = () => {
    if (phase === "dramatic") return "animate-shake";
    if (phase === "emotional") return "animate-shrink-scared";
    return "";
  };

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden transition-all duration-500 ${
        chaosActivated ? "bg-chaos-gradient animate-chaos-rotate" : "bg-valentine-gradient"
      }`}
    >
      <FloatingHearts intensity={chaosActivated ? "high" : "medium"} />
      
      <div className="z-10 text-center mb-16">
        <div className="text-5xl mb-6 animate-pulse-heart">💝</div>
        
        <h1 className="font-display text-4xl md:text-6xl text-foreground mb-4">
          Will you be my Valentine?
        </h1>
        
        <p className="text-muted-foreground text-lg font-body">
          {HELPER_TEXTS[phase]}
        </p>

        {chaosActivated && (
          <div className="mt-4 text-xl text-valentine-chaos-pink font-bold animate-bounce">
            ⚠️ CHAOS MODE ACTIVATED ⚠️
          </div>
        )}
      </div>

      {/* YES Button - Fixed position */}
      <div className="z-10 mb-8">
        <ValentineButton 
          variant={chaosActivated ? "celebration" : "yes"}
          size="xl"
          onClick={onYes}
          className="animate-bounce-soft"
        >
          💖 YES
        </ValentineButton>
      </div>

      {/* NO Button - Moving position */}
      <div 
        className="absolute z-20"
        style={{
          left: isPositioned ? noPosition.x : "50%",
          top: isPositioned ? noPosition.y : "70%",
          transform: isPositioned ? "none" : "translateX(-50%)",
          transition: phase === "shy" ? "all 0.3s ease-out" : "all 0.15s ease-out",
        }}
      >
        {tooltip && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-card text-foreground px-3 py-1 rounded-full text-sm shadow-valentine whitespace-nowrap animate-fade-in-up">
            {tooltip}
          </div>
        )}
        <ValentineButton
          ref={noButtonRef}
          variant={chaosActivated ? "chaos" : "no"}
          size={getButtonSize()}
          onClick={handleNoInteraction}
          onMouseEnter={handleNoInteraction}
          onTouchStart={handleNoInteraction}
          className={getButtonAnimation()}
        >
          🙅‍♀️ NO
        </ValentineButton>
      </div>

      {/* Betrayal Mode Popup */}
      <Dialog open={showBetrayalPopup} onOpenChange={setShowBetrayalPopup}>
        <DialogContent className="bg-card border-destructive text-center max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-destructive text-2xl flex items-center justify-center gap-2">
              ❌ ERROR
            </DialogTitle>
            <DialogDescription className="text-foreground text-lg pt-4">
              "No" is currently unavailable.
              <br />
              <span className="text-muted-foreground">Please try YES.</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center pt-4">
            <ValentineButton
              variant="yes"
              size="default"
              onClick={() => {
                setShowBetrayalPopup(false);
                onYes();
              }}
            >
              💖 Okay, YES
            </ValentineButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuestionScreen;
