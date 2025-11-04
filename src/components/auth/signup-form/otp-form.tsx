// src/components/auth/signup-form/otp-form.tsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom"; // <-- 1. Import useNavigate
import { toast } from "react-hot-toast";

interface OtpFormProps {
  email: string;
}

const OtpForm: React.FC<OtpFormProps> = ({ email }) => {
  const [otp, setOtp] = useState("");
  const { verifyOtp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // await verifyOtp({ email, otp });
    // setIsLoading(false);
    // --- 4. START OF CHANGES ---
    try {
      // Make sure your verifyOtp function in AuthContext returns the user
      const user = await verifyOtp({ email, otp });

      toast.success("Account created successfully!");

      // Add the redirection logic
      if (user && user.role === 'STARTUP') {
        navigate('/edit-profile'); // <-- This is the new redirect
      } else if (user && user.role === 'STUDENT') {
        navigate('/student-temp'); // To be consistent with your login logic
      } else {
        navigate('/postlogin'); // Default fallback
      }

    } catch (error: any) {
      console.error("OTP verification failed", error);
      // Your AuthContext likely already shows a toast on error
    } finally {
      setIsLoading(false);
    }
    // --- END OF CHANGES ---
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Enter Verification Code</h2>
        <p className="text-muted-foreground">
          A 6-digit code has been sent to {email}
        </p>
      </div>
      <div className="flex justify-center">
        <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading || otp.length < 6}>
        {isLoading ? "Verifying..." : "Verify & Create Account"}
      </Button>
    </form>
  );
};

export default OtpForm;