import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import LoginForm from "@/components/auth/login-form"
import SignupForm from "../signup-form"
// import SignupForm from "@/components/signup-form"

const AuthModals = () => {
  const [loginOpen, setLoginOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)

  const handleSwitchToSignup = () => {
    setLoginOpen(false)
    setSignupOpen(true)
  }

  const handleSwitchToLogin = () => {
    setSignupOpen(false)
    setLoginOpen(true)
  }

  return (
    <>
      {/* Login Modal */}
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
            Login
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md border-0 shadow-2xl">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </DialogTitle>
            <DialogDescription className="text-gray-600">Sign in to your account to continue</DialogDescription>
          </DialogHeader>
          <LoginForm onClose={() => setLoginOpen(false)} onSwitchToSignup={handleSwitchToSignup} />
        </DialogContent>
      </Dialog>

      {/* Signup Modal */}
      <Dialog open={signupOpen} onOpenChange={setSignupOpen}>
        <DialogTrigger asChild>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Sign Up
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg border-0 shadow-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Join StartupHub
            </DialogTitle>
            <DialogDescription className="text-gray-600">Create your account and start your journey</DialogDescription>
          </DialogHeader>
          <SignupForm onClose={() => setSignupOpen(false)} onSwitchToLogin={handleSwitchToLogin} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AuthModals
