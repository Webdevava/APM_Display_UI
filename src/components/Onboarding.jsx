import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tv, Wifi, User, CheckCircle, Loader2 } from "lucide-react";

export default function Onboarding({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [hhid, setHhid] = useState("");
  const [otp, setOtp] = useState("");
  const [progress, setProgress] = useState(0);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [inputName, setInputName] = useState("");
  const keyboardRef = useRef();
  const containerRef = useRef();

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  useEffect(() => {
    let timer;
    if (currentStep === 1 || currentStep === 4) {
      setProgress(0);
      timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer);
            nextStep();
            return 100;
          }
          return oldProgress + 4;
        });
      }, 200);
    }
    return () => clearInterval(timer);
  }, [currentStep]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowKeyboard(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputFocus = (inputName) => {
    setShowKeyboard(true);
    setInputName(inputName);
  };

  const handleInputChange = (input) => {
    if (inputName === "hhid") {
      setHhid(input);
    } else if (inputName === "otp") {
      setOtp(input);
    }
  };

  const onKeyPress = (button) => {
    if (button === "{enter}") {
      setShowKeyboard(false);
    }
  };

  const steps = [
    {
      title: "Welcome",
      icon: Tv,
      content: (
        <>
          <p className="text-center mb-6">Please turn on your TV to proceed.</p>
          <Button className="w-full" onClick={nextStep}>
            TV is On
          </Button>
        </>
      ),
    },
    {
      title: "Network Check",
      icon: Wifi,
      content: (
        <>
          <p className="text-center mb-6">
            Checking for network connectivity...
          </p>
          <Progress value={progress} className="w-full mb-4" />
        </>
      ),
    },
    {
      title: "Household ID",
      icon: User,
      content: (
        <>
          <Input
            type="text"
            placeholder="Enter HHID"
            value={hhid}
            onChange={(e) => setHhid(e.target.value)}
            onFocus={() => handleInputFocus("hhid")}
            className="mb-4"
          />
          <Button className="w-full" onClick={nextStep} disabled={!hhid}>
            Next
          </Button>
        </>
      ),
    },
    {
      title: "OTP Verification",
      icon: CheckCircle,
      content: (
        <>
          <Input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            onFocus={() => handleInputFocus("otp")}
            className="mb-4"
          />
          <Button className="w-full" onClick={nextStep} disabled={!otp}>
            Verify
          </Button>
        </>
      ),
    },
    {
      title: "Installation",
      icon: Loader2,
      content: (
        <>
          <p className="text-center mb-6">
            Please wait while we set up your device...
          </p>
          <Progress value={progress} className="w-full mb-4" />
        </>
      ),
    },
  ];

  return (
    <div
      className="h-full flex flex-col items-center justify-center bg-background p-4"
      ref={containerRef}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                {React.createElement(steps[currentStep].icon, {
                  className: "w-6 h-6",
                })}
                {steps[currentStep].title}
              </CardTitle>
            </CardHeader>
            <CardContent>{steps[currentStep].content}</CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
      {showKeyboard && (
        <div className="mt-4 w-full">
          <Keyboard
            keyboardRef={(r) => (keyboardRef.current = r)}
            layoutName="default"
            onChange={handleInputChange}
            onKeyPress={onKeyPress}
          />
        </div>
      )}
    </div>
  );
}
