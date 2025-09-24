// // import TrendingCard from "../trending-card"
// // import { TrendingUp } from "lucide-react"

// // const trendingData = [
// //   {
// //     id: "ai-funding",
// //     icon: "S",
// //     iconColor: "bg-gradient-to-r from-green-500 to-emerald-600",
// //     title: "AI Startup Funding",
// //     description: "A fresh generation of startups is revolutionizing the AI landscape with breakthrough innovations...",
// //     trend: "24%"
// //   },
// //   {
// //     id: "mentor-momentum",
// //     icon: "M",
// //     iconColor: "bg-gradient-to-r from-blue-500 to-indigo-600",
// //     title: "Mentor Momentum",
// //     description: "Tiya Malhotra has been a guiding force for emerging entrepreneurs across the tech ecosystem...",
// //     trend: "18%"
// //   },
// //   {
// //     id: "accelerator-highlights",
// //     icon: "A",
// //     iconColor: "bg-gradient-to-r from-orange-500 to-red-600",
// //     title: "Accelerator Highlights",
// //     description: "ForgeLab Accelerator continues to fuel innovation with their latest cohort of promising startups...",
// //     trend: "32%"
// //   }
// // ]

// // export default function TrendingSection() {
// //   return (
// //     <section className="mb-12 px-4">
// //       <div>
// //         <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl">
// //           <div className="flex items-center justify-between mb-8">
// //             <div className="flex items-center space-x-3">
// //               <TrendingUp className="h-8 w-8 text-yellow-500" />
// //               <h2 className="text-3xl font-bold text-white">Trending Now</h2>
// //             </div>
// //             <button className="text-blue-400 font-medium hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-gray-700">
// //               View All
// //             </button>
// //           </div>

// //           <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500">
// //             {trendingData.map((item) => (
// //               <div key={item.id} className="flex-shrink-0 w-80">
// //                 <TrendingCard {...item} />
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   )
// // }



// // src/components/feed/trending-section/index.tsx
// import { TrendingUp, Origami, Users, MessageSquare } from "lucide-react"

// export default function TrendingSection() {
//   const trendingTopics = [
//     { name: "AI & Machine Learning", posts: 142, growth: "+15%" },
//     { name: "Startup Funding", posts: 98, growth: "+22%" },
//     { name: "Product Management", posts: 76, growth: "+8%" },
//     { name: "Developer Tools", posts: 64, growth: "+12%" },
//   ]

//   return (
//     <section className="px-6 sm:px-8 lg:px-12 mb-12">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex items-center space-x-3 mb-8">
//           <TrendingUp className="h-8 w-8 text-orange-500" />
//           <h2 className="text-3xl font-bold text-white">Trending Now</h2>
//         </div>
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {trendingTopics.map((topic, index) => (
//             <div
//               key={topic.name}
//               className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:border-orange-500/30 transition-all duration-300 cursor-pointer group"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <div className="w-12 h-12 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   <Origami className="h-6 w-6 text-orange-400" />
//                 </div>
//                 <span className="text-green-400 text-sm font-medium bg-green-400/10 px-2 py-1 rounded-full">
//                   {topic.growth}
//                 </span>
//               </div>
              
//               <h3 className="font-semibold text-white mb-3 group-hover:text-orange-400 transition-colors">
//                 {topic.name}
//               </h3>
              
//               <div className="flex items-center justify-between text-gray-400 text-sm">
//                 <div className="flex items-center space-x-1">
//                   <MessageSquare className="h-4 w-4" />
//                   <span>{topic.posts} posts</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <Users className="h-4 w-4" />
//                   <span>Active</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// The main component
const TrendingSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:4000/api/trending-posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Sort the data to ensure the order is correct
        const sortedPosts = data.sort((a, b) => b.likes.length - a.likes.length);
        
        setPosts(sortedPosts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gray-900 text-white p-4 rounded-4xl">
        <p>Loading trending posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-500 p-4">
        <p>Error: {error}</p>
      </div>
    );
  }
  
  // Custom component for the trending post card
  const TrendingPostCard = ({ post }) => {
    const totalLikes = post.likes.length;
    const totalComments = post.comments.length;
    const authorName = post.author?.full_name || 'Anonymous';
    const postText = post.text.length > 150 ? post.text.substring(0, 150) + '...' : post.text;

    const getInitial = (name) => {
      return name.charAt(0).toUpperCase();
    };

    const initial = getInitial(authorName);
    const initialColor = {
      'S': 'bg-green-500',
      'M': 'bg-blue-500',
      'A': 'bg-red-500'
    }[initial] || 'bg-gray-500';

    return (
      <div 
        className="flex-shrink-0 w-80 p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-xl hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
        onClick={() => navigate(`/post/${post.id}`)}
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-lg ${initialColor} shadow-md`}>
            {initial}
          </div>
          <h3 className="text-xl font-bold text-white">{authorName}</h3>
        </div>
        <p className="text-sm text-gray-400 mb-4">{postText}</p>
        <div className="flex items-center space-x-4 text-gray-400 text-sm mt-auto">
          <div className="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>{totalLikes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 12h8v2H6v-2zm12 0h-2V6h2v6z"/>
            </svg>
            <span>{totalComments}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-900 py-12 px-8 font-sans mb-[20px] rounded-md">
      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
      <div className="max-w-6xl mx-auto mb-8 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 border border-gray-700 shadow-2xl">
        <div className="flex items-center space-x-3 mb-8">
          <TrendingUp className="h-8 w-8 text-orange-500" />
          <h2 className="text-3xl font-bold text-white">Trending Now</h2>
        </div>
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
          {posts.slice(0, 5).map(post => (
            <TrendingPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;
