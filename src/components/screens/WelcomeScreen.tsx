import React from "react";
import { ValentineButton } from "@/components/ui/valentine-button";
import FloatingHearts from "@/components/FloatingHearts";

interface WelcomeScreenProps {
  onContinue: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-valentine-gradient flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <FloatingHearts intensity="low" />
      
      <div className="z-10 text-center animate-fade-in-up">
        <div className="text-6xl mb-8 animate-bounce-soft">💌</div>
        
        <h1 className="font-display text-5xl md:text-7xl text-foreground mb-4">
          Hiii 😌
        </h1>
        
        <p className="font-display text-3xl md:text-4xl text-foreground mb-2">
          I have a very important question…
        </p>
        
        <p className="text-muted-foreground text-lg mb-12 font-body">
          Please take this very seriously.
        </p>
        
        <ValentineButton 
          variant="yes" 
          size="lg"
          onClick={onContinue}
          className="animate-float"
        >
          Okay… 👀
        </ValentineButton>
      </div>
    </div>
  );
};

export default WelcomeScreen;
