import { useProfileCompletion } from '@/hooks/useStartupAPI';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/toast';

export const useProfileRequirement = () => {
  const { data: completionData } = useProfileCompletion();
  const isComplete = completionData?.isComplete || false;
  const navigate = useNavigate();
  const { showToast } = useToast();

  const requireProfileCompletion = (action: string = 'perform this action') => {
    if (!isComplete) {
      showToast(
        `Please complete your startup profile to ${action}`,
        'error'
      );
      navigate('/edit-profile');
      return false;
    }
    return true;
  };

  const checkProfileForComment = () => {
    return requireProfileCompletion('comment on posts');
  };

  const checkProfileForPost = () => {
    return requireProfileCompletion('create posts');
  };

  const checkProfileForInteraction = () => {
    return requireProfileCompletion('interact with the community');
  };

  return {
    isComplete,
    requireProfileCompletion,
    checkProfileForComment,
    checkProfileForPost,
    checkProfileForInteraction,
  };
};
