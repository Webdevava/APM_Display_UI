"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  CheckCircle,
  Wifi,
  Tv,
  Bluetooth,
  Battery,
  Radio,
} from "lucide-react";
import { OnScreenKeyboard } from "./OnScreenKeyboard";
import { OtpInput } from "./OtpInput";
import { MeterIdInput } from "./MeterIdInput";

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hhId, setHhId] = useState("");
  const [remoteId, setRemoteId] = useState("");
  const [adaptorId, setAdaptorId] = useState("");
  const [meterId, setMeterId] = useState("");
  const [audioVideoSource, setAudioVideoSource] = useState("");
  const [bleStatus, setBleStatus] = useState(false);
  const [batteryStatus, setBatteryStatus] = useState(0);
  const [tvTamperStatus, setTvTamperStatus] = useState(false);
  const [networkStatus, setNetworkStatus] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [activeInput, setActiveInput] = useState(null);

  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => {
        setStep(1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    setProgress((step / 14) * 100);
  }, [step]);

  useEffect(() => {
    if (step === 14) {
      const timer = setTimeout(() => {
        onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, onComplete]);

  const nextStep = () => {
    if (step < 14) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const validateId = (id) => {
    return id.length > 0;
  };

  const checkBleConnectivity = () => {
    setBleStatus(true);
    return true;
  };

  const checkBatteryStatus = () => {
    setBatteryStatus(85);
    return batteryStatus > 80;
  };

  const checkTvTamper = () => {
    setTvTamperStatus(true);
    return tvTamperStatus;
  };

  const performNetworkTest = () => {
    setNetworkStatus(true);
    return networkStatus;
  };

  const handleKeyPress = (key) => {
    if (activeInput === "hhId") {
      setHhId(hhId + key);
    } else if (activeInput === "remoteId") {
      setRemoteId(remoteId + key);
    } else if (activeInput === "adaptorId") {
      setAdaptorId(adaptorId + key);
    } else if (activeInput === "meterId") {
      setMeterId(meterId + key);
    } else if (activeInput === "otp") {
      setOtp(otp + key);
    }
  };

  const handleInputFocus = (inputName) => {
    setActiveInput(inputName);
  };

  const handleCloseKeyboard = () => {
    setActiveInput(null);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Welcome</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center mb-4">Inditronics Meter Installation</p>
              <Progress value={progress} className="w-full mb-4" />
            </CardContent>
          </Card>
        );
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Enter Household ID</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={hhId}
                onChange={(e) => setHhId(e.target.value)}
                onFocus={() => handleInputFocus("hhId")}
                placeholder="Enter Household ID"
                className="mb-4"
              />
              <Button onClick={nextStep} disabled={!validateId(hhId)}>
                Next
              </Button>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Enter Remote ID</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={remoteId}
                onChange={(e) => setRemoteId(e.target.value)}
                onFocus={() => handleInputFocus("remoteId")}
                placeholder="Enter Remote ID"
                className="mb-4"
              />
              <Button onClick={nextStep} disabled={!validateId(remoteId)}>
                Next
              </Button>
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Enter Power Adaptor ID</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={adaptorId}
                onChange={(e) => setAdaptorId(e.target.value)}
                onFocus={() => handleInputFocus("adaptorId")}
                placeholder="Enter Power Adaptor ID"
                className="mb-4"
              />
              <Button onClick={nextStep} disabled={!validateId(adaptorId)}>
                Next
              </Button>
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Enter Meter ID</CardTitle>
            </CardHeader>
            <CardContent>
            
              <Input
                value={meterId}
                onChange={(e) => setMeterId(e.target.value)}
                onFocus={() => handleInputFocus("meterId")}
                placeholder="Enter Meter ID"
                className="mb-4"
              />
              <Button onClick={nextStep} disabled={!validateId(meterId)}>
                Next
              </Button>
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Check BLE Connectivity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span>BLE Status:</span>
                {bleStatus ? (
                  <CheckCircle className="text-green-500" />
                ) : (
                  <AlertCircle className="text-red-500" />
                )}
              </div>
              <Button
                onClick={() => {
                  if (checkBleConnectivity()) nextStep();
                }}
              >
                Check BLE Connectivity
              </Button>
            </CardContent>
          </Card>
        );
      case 6:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Battery Check</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span>Battery Status: {batteryStatus}%</span>
                <Battery
                  className={
                    batteryStatus > 80 ? "text-green-500" : "text-red-500"
                  }
                />
              </div>
              <Button
                onClick={() => {
                  if (checkBatteryStatus()) nextStep();
                }}
              >
                Check Battery
              </Button>
            </CardContent>
          </Card>
        );
      case 7:
        return (
          <Card>
            <CardHeader>
              <CardTitle>TV Tamper Check</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Ensure TV cable is plugged into the adaptor.
              </p>
              <div className="flex items-center justify-between mb-4">
                <span>TV Tamper Status:</span>
                {tvTamperStatus ? (
                  <CheckCircle className="text-green-500" />
                ) : (
                  <AlertCircle className="text-red-500" />
                )}
              </div>
              <Button
                onClick={() => {
                  if (checkTvTamper()) nextStep();
                }}
              >
                Check TV Tamper
              </Button>
            </CardContent>
          </Card>
        );
      case 8:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Select Audio/Video Source</CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setAudioVideoSource}>
                <SelectTrigger className="w-full mb-4">
                  <SelectValue placeholder="Select Audio/Video Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hdmi">HDMI</SelectItem>
                  <SelectItem value="rca">RCA</SelectItem>
                  <SelectItem value="internal">Internal Microphone</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={nextStep} disabled={!audioVideoSource}>
                Next
              </Button>
            </CardContent>
          </Card>
        );
      case 9:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Connection Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              {audioVideoSource === "hdmi" && (
                <p>
                  Connect the STB Box Cable to HDMI Splitter. Connect one HDMI
                  cable to TV and another to the Meter.
                </p>
              )}
              {audioVideoSource === "rca" && (
                <p>
                  Connect the STB Box Cable to Line In, MIC In, or External
                  Microphone.
                </p>
              )}
              {audioVideoSource === "internal" && (
                <p>Ensure the internal microphone is properly configured.</p>
              )}
              <Button onClick={nextStep} className="mt-4">
                Next
              </Button>
            </CardContent>
          </Card>
        );
      case 10:
        return (
          <Card>
            <CardHeader>
              <CardTitle>TV Setup</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Turn on the TV and set to Channel 1.</p>
              <Button onClick={nextStep}>TV is On and Set to Channel 1</Button>
            </CardContent>
          </Card>
        );
      case 11:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Network Test</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span>Network Status:</span>
                {networkStatus ? (
                  <Wifi className="text-green-500" />
                ) : (
                  <Wifi className="text-red-500" />
                )}
              </div>
              <Button
                onClick={() => {
                  if (performNetworkTest()) nextStep();
                }}
              >
                Perform Network Test
              </Button>
            </CardContent>
          </Card>
        );
      case 12:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Calibration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Please turn off the TV for calibration.</p>
              <Button onClick={nextStep}>TV is Off</Button>
            </CardContent>
          </Card>
        );
      case 13:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Enter OTP</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                onFocus={() => handleInputFocus("otp")}
                placeholder="Enter OTP"
                className="mb-4"
              />
              <Button onClick={nextStep} disabled={otp.length !== 6}>
                Verify OTP
              </Button>

              {/* <Input
                value={meterId}
                onChange={(e) => setMeterId(e.target.value)}
                onFocus={() => handleInputFocus("otp")}
                placeholder="Enter Meter ID"
                className="mb-4"
              />
              <Button onClick={nextStep} disabled={!validateId(meterId)}>
                Next
              </Button> */}
            </CardContent>
          </Card>
        );
      case 14:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Installation Complete</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center mb-4">Meter Successfully Installed!</p>
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
        <Progress value={(step / 14) * 100} className="w-full mt-4" />
        {activeInput && (
          <OnScreenKeyboard
            type="text"
            onKeyPress={handleKeyPress}
            onClose={handleCloseKeyboard}
          />
        )}
      </div>
    </div>
  );
}
