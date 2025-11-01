// src/store/needsStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Need post interface for the activity feed
interface ActivityNeedPost {
  id: string;
  name: string;
  avatar: string;
  avatarColor: string;
  badge: string;
  badgeColor: string;
  timeAgo: string;
  content: string;
  likes: number;
  comments: number;
  isFollowing: boolean;
  image: string | null;
  formType: string;
  createdAt: number;
}

// Backend need response interface
export interface BackendNeed {
  id: number;
  user_id: number;
  type: string;
  title: string;
  description: string;
  image_url?: string;
  contact_info: any;
  details_json: any;
  location?: string;
  duration?: string;
  skills?: string;
  compensation?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    full_name: string;
    email: string;
  };
}

// This is the interface your frontend components (like NeedCard) use
// It's helpful to have both defined.
export interface Need extends Omit<BackendNeed, 'user_id'> {
  userId: number | string; // <-- This is what your frontend NeedCard expects
}

interface NeedsState {
  // Activity feed posts (formatted for UI display)
  activityPosts: ActivityNeedPost[];
  
  // Backend needs data (raw API responses)
  backendNeeds: BackendNeed[];
  
  // Loading states
  isSubmitting: boolean;
  isLoading: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
  error: string | null;
  
  // Actions for activity posts
  addActivityPost: (post: ActivityNeedPost) => void;
  removeActivityPost: (id: string) => void;
  clearActivityPosts: () => void;
  
  // Actions for backend needs
  addBackendNeed: (need: BackendNeed) => void;
  updateBackendNeed: (id: number, need: Partial<BackendNeed>) => void;
  removeBackendNeed: (id: number) => void;
  setBackendNeeds: (needs: BackendNeed[]) => void;
  
  // UI state actions
  setSubmitting: (isSubmitting: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;

  deleteNeed: (needId: number, token: string) => Promise<void>;
  updateNeed: (
    needId: number, 
    formType: string, 
    formData: any, 
    token: string
  ) => Promise<void>;
  
  // Utility functions
  getActivityPostsByType: (formType?: string) => ActivityNeedPost[];
  getTotalActivityPosts: () => number;
}

// Helper function to create activity post from form data (same as your existing function)
const createActivityPost = (formType: string, formData: any): ActivityNeedPost => {
  const getBadgeInfo = (type: string) => {
    switch (type) {
      case "live-projects":
        return {
          badge: "Project",
          badgeColor: "bg-violet-500/20 text-violet-400 border border-violet-500/30"
        };
      case "internship":
        return {
          badge: "Internship",
          badgeColor: "bg-blue-500/20 text-blue-400 border border-blue-500/30"
        };
      case "research":
        return {
          badge: "Research",
          badgeColor: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
        };
      case "csr-initiative":
        return {
          badge: "CSR",
          badgeColor: "bg-rose-500/20 text-rose-400 border border-rose-500/30"
        };
      default:
        return {
          badge: "Opportunity",
          badgeColor: "bg-purple-500/20 text-purple-400 border border-purple-500/30"
        };
    }
  };

  const getAvatarColor = (type: string) => {
    switch (type) {
      case "live-projects":
        return "bg-gradient-to-r from-violet-500 to-purple-600";
      case "internship":
        return "bg-gradient-to-r from-blue-500 to-cyan-600";
      case "research":
        return "bg-gradient-to-r from-emerald-500 to-teal-600";
      case "csr-initiative":
        return "bg-gradient-to-r from-rose-500 to-pink-600";
      default:
        return "bg-gradient-to-r from-purple-500 to-blue-600";
    }
  };

  const getContent = (formType: string, data: any) => {
    const companyName = data.companyName || "OrionEduverse";

    switch (formType) {
      case "live-projects":
        return `🚀 New Live Project Opportunity!\n\n📋 ${data.projectTitle || "Project Title"}\n\n${data.projectDescription || "Project description"}\n\n💼 Skills: ${data.projectSkills || "Various skills"}\n⏱️ Duration: ${data.projectDuration || "Flexible"}\n💰 Compensation: ${data.projectCompensation || "Competitive"}\n\nInterested? Apply now!`;

      case "internship":
        return `🎓 Internship Opportunity Available!\n\n📝 ${data.job_title || "Internship Position"}\n\n${data.description || "Internship description"}\n\n🎯 Open For: ${data.open_for || "Students"}\n⏱️ Duration: ${data.duration || "Flexible"}\n💰 Stipend: ${data.stipend || "Competitive"}\n\nPerfect for students looking to gain real-world experience!`;

      case "research":
        return `🔬 Research Opportunity!\n\n📚 ${data.researchTitle || "Research Project"}\n\n${data.researchDescription || "Research description"}\n\n🎯 Open For: ${data.researchOpenFor || "Researchers"}\n⏱️ Duration: ${data.researchDuration || "Flexible"}\n💰 Stipend: ${data.researchStipend || "Competitive"}\n\nJoin us in pushing the boundaries of knowledge!`;

      case "csr-initiative":
        return `❤️ CSR Initiative - Make a Difference!\n\n🌱 ${data.initiativeType || "Social Initiative"}\n\n${data.csrDescription || "CSR description"}\n\n⏱️ Duration: ${data.csrDuration || "Ongoing"}\n👥 Team Size: ${data.members || "Flexible"}\n💰 Compensation: ${data.csrCompensation || "Volunteer"}\n\nHelp us create positive social impact!`;

      default:
        return `New opportunity posted by ${companyName}! Check it out and apply if interested.`;
    }
  };

  const badgeInfo = getBadgeInfo(formType);
  const createdAt = Date.now();

  return {
    id: `post-${createdAt}`,
    name: formData.companyName || "OrionEduverse",
    avatar: (formData.companyName || "O").charAt(0).toUpperCase(),
    avatarColor: getAvatarColor(formType),
    badge: badgeInfo.badge,
    badgeColor: badgeInfo.badgeColor,
    timeAgo: "Just now",
    content: getContent(formType, formData),
    likes: 0,
    comments: 0,
    isFollowing: false,
    image: formData.image || null,
    formType,
    createdAt
  };
};


const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export const useNeedsStore = create<NeedsState>()(
  persist(
    (set, get) => ({
      // Initial state
      activityPosts: [],
      backendNeeds: [],
      isSubmitting: false,
      isLoading: false,
      isDeleting: false,
      isUpdating: false,
      error: null,

      // Activity posts actions
      addActivityPost: (post: ActivityNeedPost) =>
        set((state) => ({
          activityPosts: [post, ...state.activityPosts]
        })),

      removeActivityPost: (id: string) =>
        set((state) => ({
          activityPosts: state.activityPosts.filter(post => post.id !== id)
        })),

      clearActivityPosts: () =>
        set({ activityPosts: [] }),

      // Backend needs actions
      addBackendNeed: (need: BackendNeed) =>
        set((state) => ({
          backendNeeds: [need, ...state.backendNeeds]
        })),

      updateBackendNeed: (id: number, updatedNeed: Partial<BackendNeed>) =>
        set((state) => ({
          backendNeeds: state.backendNeeds.map(need =>
            need.id === id ? { ...need, ...updatedNeed } : need
          )
        })),

      removeBackendNeed: (id: number) =>
        set((state) => ({
          backendNeeds: state.backendNeeds.filter(need => need.id !== id)
        })),

      setBackendNeeds: (needs: BackendNeed[]) =>
        set({ backendNeeds: needs }),

      // UI state actions
      setSubmitting: (isSubmitting: boolean) =>
        set({ isSubmitting }),

      setLoading: (isLoading: boolean) =>
        set({ isLoading }),

      setError: (error: string | null) =>
        set({ error }),

      // Utility functions
      getActivityPostsByType: (formType?: string) => {
        const { activityPosts } = get();
        if (!formType) return activityPosts;
        return activityPosts.filter(post => post.formType === formType);
      },

      deleteNeed: async (needId, token) => {
        set({ isDeleting: true, error: null });
        try {
          const response = await fetch(`${apiBase}/api/needs/${needId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || 'Failed to delete need');
          }

          // On success, call the existing local removal function
          get().removeBackendNeed(needId);

        } catch (error: any) {
          set({ error: error.message });
          throw error; // Re-throw to be caught by the component
        } finally {
          set({ isDeleting: false });
        }
      },

      updateNeed: async (needId, formType, formData, token) => {
        set({ isUpdating: true, error: null });
        try {
          const response = await fetch(`${apiBase}/api/needs/${needId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ formType, formData }),
          });

          if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || 'Failed to update need');
          }

          const result = await response.json();
          const updatedNeed: BackendNeed = result.data.need; // <-- This is the raw BackendNeed

          // On success, call the existing local update function
          get().updateBackendNeed(needId, updatedNeed);

        } catch (error: any) {
          set({ error: error.message });
          throw error; // Re-throw to be caught by the component
        } finally {
          set({ isUpdating: false });
        }
      },

      getTotalActivityPosts: () => {
        const { activityPosts } = get();
        return activityPosts.length;
      },
    }),
    {
      name: 'needs-storage', // localStorage key
      // Only persist the activity posts, not loading states
      partialize: (state) => ({
        activityPosts: state.activityPosts,
        backendNeeds: state.backendNeeds,
      }),
    }
  )
);

// Helper function to create and add activity post (for use in components)
export const createAndAddActivityPost = (formType: string, formData: any) => {
  const activityPost = createActivityPost(formType, formData);
  const { addActivityPost } = useNeedsStore.getState();
  addActivityPost(activityPost);
  return activityPost;
};