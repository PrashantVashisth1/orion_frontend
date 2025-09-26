import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {apiClient} from '@/lib/my-api-client';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

export default function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      const response = await apiClient.forgotPassword(email);
      setMessage(response.message);
    } catch (error) {
      setMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Reset Your Password</h2>
      <p className="text-sm text-gray-400 mb-6">
        Enter your email address, and we will send you a link to get back into your account.
      </p>
      {message ? (
        <div className="p-3 mb-4 text-center bg-green-900 border border-green-700 rounded-md">
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="bg-gray-700 border-gray-600"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>
      )}
      <div className="mt-6 text-center">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onBackToLogin();
          }}
          className="text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          &larr; Back to login
        </a>
      </div>
    </div>
  );
}