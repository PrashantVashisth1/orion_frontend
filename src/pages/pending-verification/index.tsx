import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react'; // Added icons for visual appeal

export default function PendingVerificationPage() {
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-900 p-6">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-8 text-center shadow-lg border border-zinc-700">
        
        <div className="mb-6 flex justify-center">
          <Clock className="h-16 w-16 text-blue-500" />
        </div>

        <h1 className="mb-4 text-2xl font-bold text-white">
          Profile Submitted for Review
        </h1>
        
        <p className="mb-6 text-gray-300">
          Thank you for sharing your details. Your profile is submitted for
          review and verification, we will intimate you once verification is
          complete.
        </p>

        <p className="mb-8 text-sm text-gray-400">
          Please reach us at{' '}
          <a
            href="mailto:contact@omverg.com"
            className="font-medium text-blue-400 hover:text-blue-300"
          >
            contact@omverg.com
          </a>{' '}
          for any query.
        </p>

        <Button
          onClick={logout}
          variant="outline"
          className="w-full border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700 hover:text-white"
        >
          Log Out
        </Button>
      </div>
    </div>
  );
}