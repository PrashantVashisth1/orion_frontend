// // src/pages/activities/index.tsx
// import Navbarpostlogin from "@/components/postlogincomponents/Navbarpostlogin";
// import Footer from "@/components/postlogincomponents/footer";
// import { useAuthStore } from "@/store/authStore";
// // import { useState, useEffect } from "react";
// import { useQuery } from '@tanstack/react-query';
// import { Loader2, Frown } from "lucide-react";
// // import ActivityPost from "@/components/feed/my-activity-post"; // Re-using this component

// const fetchUserActivities = async () => {
//   const token = useAuthStore.getState().token;
//   const response = await fetch(`${import.meta.env.VITE_API_BASE}/activities/me`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch user activities");
//   }

//   const result = await response.json();
//   return result.data.activities;
// };

// const UserActivitiesPage = () => {
//   const { data: activities, isLoading, isError, error } = useQuery({
//     queryKey: ["userActivities"],
//     queryFn: fetchUserActivities,
//   });

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center">
//         <Loader2 className="h-10 w-10 text-blue-400 animate-spin mb-4" />
//         <p className="text-gray-400">Loading your activities...</p>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center">
//         <Frown className="h-12 w-12 text-red-400 mb-4" />
//         <p className="text-lg text-red-400">Error: {error.message}</p>
//       </div>
//     );
//   }

//   const formatActivityContent = (activity) => {
//     switch(activity.type) {
//       case 'POST':
//         return `Created a new post: "${activity.text.substring(0, 50)}..."`;
//       case 'LIKE':
//         return `Liked a post by ${activity.post.author.full_name}`;
//       case 'COMMENT':
//         return `Commented on a post by ${activity.post.author.full_name}: "${activity.content.substring(0, 50)}..."`;
//       case 'SESSION':
//         return `Created a new session: "${activity.title}"`;
//       case 'NEED':
//         return `Created a new need: "${activity.title}"`;
//       default:
//         return "Performed an unknown activity";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-900">
//       <Navbarpostlogin />
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         <h1 className="text-3xl font-bold text-white mb-8">My Activities</h1>
//         <div className="space-y-6">
//           {activities.length > 0 ? (
//             activities.map((activity) => (
//               <div key={activity.id} className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
//                 <p className="text-gray-300 text-lg">
//                   <span className="font-semibold text-purple-400">{activity.user?.full_name || 'You'}</span> {formatActivityContent(activity)}
//                 </p>
//                 <p className="text-sm text-gray-500 mt-2">
//                   {new Date(activity.created_at).toLocaleString()}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-12">
//               <Frown className="h-12 w-12 text-gray-500 mx-auto mb-4" />
//               <p className="text-gray-400 text-lg">No activities found.</p>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default UserActivitiesPage;

// src/pages/my-activities/index.tsx
import Navbarpostlogin from "@/components/postlogincomponents/Navbarpostlogin";
import Footer from "@/components/postlogincomponents/footer";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from '@tanstack/react-query';
import { Loader2, Frown, Activity } from "lucide-react";

const fetchUserActivities = async () => {
  const token = useAuthStore.getState().token;
  const response = await fetch(`${import.meta.env.VITE_API_BASE}/activities/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user activities");
  }

  const result = await response.json();
  return result.data.activities;
};

const UserActivitiesPage = () => {
  const { data: activities, isLoading, isError, error } = useQuery({
    queryKey: ["userActivities"],
    queryFn: fetchUserActivities,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-500">Loading your activities...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Frown className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-lg text-red-600">Error: {(error as Error).message}</p>
      </div>
    );
  }

  const formatActivityContent = (activity: any) => {
    switch(activity.type) {
      case 'POST':
        return `Created a new post: "${activity.text?.substring(0, 50) || ''}..."`;
      case 'LIKE':
        return `Liked a post by ${activity.post?.author?.full_name || 'someone'}`;
      case 'COMMENT':
        return `Commented on a post by ${activity.post?.author?.full_name || 'someone'}: "${activity.content?.substring(0, 50) || ''}..."`;
      case 'SESSION':
        return `Created a new session: "${activity.title || 'Untitled'}"`;
      case 'NEED':
        return `Created a new need: "${activity.title || 'Untitled'}"`;
      default:
        return "Performed an unknown activity";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbarpostlogin />
      
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">My Activities</h1>
          </div>

          <div className="space-y-4">
            {activities && activities.length > 0 ? (
              activities.map((activity: any) => (
                <div 
                  key={activity.id} 
                  className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <p className="text-gray-700 text-lg leading-relaxed">
                    <span className="font-semibold text-purple-600">
                      {activity.user?.full_name || 'You'}
                    </span>{' '}
                    {formatActivityContent(activity)}
                  </p>
                  <div className="flex items-center mt-3 text-sm text-gray-500">
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium uppercase tracking-wide mr-2 text-gray-600">
                        {activity.type}
                    </span>
                    {new Date(activity.created_at).toLocaleString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Activity className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No activities found</h3>
                <p className="text-gray-500">You haven't performed any activities yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserActivitiesPage;