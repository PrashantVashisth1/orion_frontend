// src/components/auth/signup-form/otp-form.tsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "@/contexts/AuthContext";

interface OtpFormProps {
  email: string;
}

const OtpForm: React.FC<OtpFormProps> = ({ email }) => {
  const [otp, setOtp] = useState("");
  const { verifyOtp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await verifyOtp({ email, otp });
    setIsLoading(false);
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