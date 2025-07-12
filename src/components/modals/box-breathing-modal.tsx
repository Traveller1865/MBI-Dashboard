"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface BoxBreathingModalProps {
  open: boolean
  onClose: () => void
}

export default function BoxBreathingModal({ open, onClose }: BoxBreathingModalProps) {
  const [step, setStep] = useState<"intro" | "countdown" | "session">("intro")
  const [count, setCount] = useState(3)

  useEffect(() => {
    if (step === "countdown" && count > 0) {
      const timer = setTimeout(() => setCount((prev) => prev - 1), 1000)
      return () => clearTimeout(timer)
    } else if (step === "countdown" && count === 0) {
      setStep("session")
    }
  }, [step, count])

  const handleClose = () => {
    setStep("intro")
    setCount(3)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Box Breathing</DialogTitle>
        </DialogHeader>

        {step === "intro" && (
          <div className="text-center space-y-4 py-4">
            <p className="text-sm">
              Find a quiet, relaxing space. Sit comfortably—either upright in a chair or cross-legged on the floor.
            </p>
            <Button onClick={() => setStep("countdown")} className="w-full">
              Begin
            </Button>
          </div>
        )}

        {step === "countdown" && (
          <div className="flex flex-col items-center justify-center py-6">
            <p className="text-sm mb-4">Starting in...</p>
            <div className="text-5xl font-bold">{count}</div>
          </div>
        )}

        {step === "session" && (
          <div id="box-breathing-modal" className="mx-auto my-4 flex items-center justify-center">
            <style>{`
            #box-breathing-modal {
              --animation-time: 16s;
              --box-side-length: 200px;
              --box-border-width: 2px;
              --box-border-color: #003794;
              --dot-size: 1rem;
              --box-fill-color: #006ed4;
              --box-fill-color-transition: #003794;
              --bg-color: #ffffff;
              background-color: var(--bg-color);
              position: relative;
              width: var(--box-side-length);
              height: var(--box-side-length);
              display: flex;
              align-items: center;
              justify-content: center;
            }
            #box-container {
              position: relative;
              width: 100%;
              height: 100%;
            }
            #box {
              width: 100%;
              height: 100%;
              border: var(--box-border-width) solid var(--box-border-color);
              box-sizing: border-box;
            }
            #breath-indicator {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              background: linear-gradient(
                135deg,
                var(--box-fill-color) 0%,
                var(--box-fill-color-transition) 30%,
                var(--bg-color) 75%
              );
              background-size: 700% 700%;
              animation: breath-indicator-animation var(--animation-time) infinite cubic-bezier(0.2,0,0.8,1);
            }
            @keyframes breath-indicator-animation {
              0% { height: 0%; background-position: 100% 50%; }
              25% { height: 0%; background-position: 100% 50%; }
              50% { height: 100%; background-position: 0% 0%; }
              75% { height: 100%; background-position: 0% 0%; }
              100% { height: 0%; background-position: 100% 50%; }
            }
            #dot {
              position: absolute;
              width: var(--dot-size);
              height: var(--dot-size);
              transform: translate(-50%, -50%);
              border-radius: 50%;
              border: var(--box-border-width) solid var(--box-border-color);
              background: var(--bg-color);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 0.75rem;
              font-weight: bold;
              color: #fff;
              animation: dot-animation var(--animation-time) infinite cubic-bezier(0.2,0,0.8,1);
              left: 0%;
              top: 100%;
            }
            @keyframes dot-animation {
              0% { left: 0%; top: 100%; }
              25% { left: 0%; top: 0%; }
              50% { left: 100%; top: 0%; }
              75% { left: 100%; top: 100%; }
              100% { left: 0%; top: 100%; }
            }
            #guide-text {
              position: absolute;
              inset: 0;
              display: grid;
              place-items: center;
              font-weight: bold;
              color: #000;
              font-size: 1.1rem;
            }
            #guide-text div {
              grid-column: 1;
              grid-row: 1;
              opacity: 0;
            }
            #breathe-in { animation: breathe-in var(--animation-time) infinite cubic-bezier(0.2,0,0.8,1); }
            @keyframes breathe-in {
              0%,25% { opacity: 0; }
              27.5%,42.5% { opacity: 1; }
              50% { opacity: 0; }
            }
            #breathe-out { animation: breathe-out var(--animation-time) infinite cubic-bezier(0.2,0,0.8,1); }
            @keyframes breathe-out {
              0%,75% { opacity: 0; }
              77.5%,92.5% { opacity: 1; }
            }
            #hold { animation: hold var(--animation-time) infinite cubic-bezier(0.2,0,0.8,1); }
            @keyframes hold {
              0% { opacity: 0; }
              2.5%,17.5% { opacity: 1; }
              25%,50% { opacity: 0; }
              52.5%,67.5% { opacity: 1; }
              75% { opacity: 0; }
            }
          `}</style>

            <div id="box-container">
              <div id="box"></div>
              <div id="breath-indicator"></div>
              <div id="dot"></div>
              <div id="guide-text">
                <div id="breathe-in">Inhale</div>
                <div id="hold">Hold</div>
                <div id="breathe-out">Exhale</div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
