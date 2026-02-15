import React, { useState } from "react";
import { ValentineButton } from "@/components/ui/valentine-button";
import FloatingHearts from "@/components/FloatingHearts";
import Confetti from "@/components/Confetti";

interface ConfirmationScreenProps {
  onComplete: () => void;
}

const CONFIRMATION_STEPS = [
  {
    text: "WAIT 😳",
    subtext: "Are you sure?",
    buttons: ["Yes", "Yes but louder"],
  },
  {
    text: "Like… REALLY sure??",
    subtext: "",
    buttons: ["Obviously", "Duh 🙄"],
  },
  {
    text: "Even if I annoy you every single day?",
    subtext: "",
    buttons: ["You already do", "Still yes ❤️"],
  },
  {
    text: "Even if I steal your snacks?",
    subtext: "",
    buttons: ["NEVER 😡", "Fine 😔"],
    showConfetti: true,
  },
];

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentStep = CONFIRMATION_STEPS[step];

  const handleButtonClick = () => {
    if (step === CONFIRMATION_STEPS.length - 1) {
      setShowConfetti(true);
      setTimeout(onComplete, 1500);
    } else {
      if (currentStep.showConfetti) {
        setShowConfetti(true);
      }
      setStep(step + 1);
    }
  };

  return (
    <div className="min-h-screen bg-valentine-gradient flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <FloatingHearts intensity={step >= 2 ? "high" : "medium"} />
      {showConfetti && <Confetti />}
      
      <div className="z-10 text-center animate-fade-in-up" key={step}>
        <div className="text-5xl mb-6">{step === 0 ? "😳" : step === 1 ? "🤔" : step === 2 ? "😈" : "🍪"}</div>
        
        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
          {currentStep.text}
        </h1>
        
        {currentStep.subtext && (
          <p className="text-muted-foreground text-lg mb-8 font-body">
            {currentStep.subtext}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          {currentStep.buttons.map((buttonText, index) => (
            <ValentineButton
              key={index}
              variant={index === 0 ? "soft" : "yes"}
              size="lg"
              onClick={handleButtonClick}
              className={index === 1 ? "animate-bounce-soft" : ""}
            >
              {buttonText}
            </ValentineButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
