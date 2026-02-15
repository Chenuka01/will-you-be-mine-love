import React, { useState } from "react";
import { ValentineButton } from "@/components/ui/valentine-button";
import FloatingHearts from "@/components/FloatingHearts";

interface FallbackScreenProps {
  onContinue: () => void;
}

const FallbackScreen: React.FC<FallbackScreenProps> = ({ onContinue }) => {
  const [showSoftQuestion, setShowSoftQuestion] = useState(false);

  if (showSoftQuestion) {
    return (
      <div className="min-h-screen bg-valentine-gradient flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <FloatingHearts intensity="medium" />
        
        <div className="z-10 text-center animate-fade-in-up">
          <div className="text-6xl mb-8">❤️</div>
          
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-8">
            Will you be my Valentine?
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ValentineButton
              variant="yes"
              size="lg"
              onClick={onContinue}
            >
              💕 Yes
            </ValentineButton>
            <ValentineButton
              variant="yes"
              size="lg"
              onClick={onContinue}
            >
              🥰 Of course
            </ValentineButton>
          </div>
          
          <p className="text-muted-foreground text-sm mt-8 italic">
            (The NO button has retired)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-valentine-gradient flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <FloatingHearts intensity="low" />
      
      <div className="z-10 text-center max-w-md animate-fade-in-up">
        <div className="text-5xl mb-6">😅</div>
        
        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
          Okay okay
        </h1>
        
        <p className="font-display text-2xl text-foreground mb-2">
          I was just kidding.
        </p>
        
        <p className="text-muted-foreground text-lg mb-6 font-body">
          I promise I wasn't trying to annoy you…
          <br />
          I just wanted to make you smile.
        </p>

        <p className="text-sm text-muted-foreground mb-8 italic">
          Please don't be mad.
        </p>

        <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-float mb-8">
          <p className="font-body text-foreground text-lg mb-2">
            No games now.
          </p>
          <p className="font-body text-foreground text-lg mb-2">
            No tricks.
          </p>
          <p className="font-display text-2xl text-foreground">
            Just me. 💕
          </p>
        </div>
        
        <ValentineButton
          variant="yes"
          size="lg"
          onClick={() => setShowSoftQuestion(true)}
        >
          💖 Okay, tell me
        </ValentineButton>
      </div>
    </div>
  );
};

export default FallbackScreen;
