import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {apiClient} from '@/lib/my-api-client';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!token) {
        setError("Invalid reset link. No token found.");
        return;
    }
    setIsLoading(true);
    setError('');
    setMessage('');
    try {
      const response = await apiClient.resetPassword(token, password);
      setMessage(response.message + " Redirecting to login...");
      setTimeout(() => navigate('/'), 3000); // Redirect to home/login page
    } catch (err: any) {
      setError(err.message || 'Failed to reset password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Set a New Password</h2>
        
        {message && <div className="p-3 text-center bg-green-900 border border-green-700 rounded-md">{message}</div>}
        {error && <div className="p-3 text-center bg-red-900 border border-red-700 rounded-md">{error}</div>}

        {!message && (
             <form onSubmit={handleSubmit} className="space-y-4">
             <div>
               <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
               <Input
                 type="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
                 className="bg-gray-700 border-gray-600"
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
               <Input
                 type="password"
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
                 required
                 className="bg-gray-700 border-gray-600"
               />
             </div>
             <Button type="submit" className="w-full" disabled={isLoading}>
               {isLoading ? 'Resetting...' : 'Reset Password'}
             </Button>
           </form>
        )}
       
      </div>
    </div>
  );
}