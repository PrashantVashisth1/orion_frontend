
import { useState, useEffect } from 'react';
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
        const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/trending-posts`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Sort the data to ensure the order is correct
        const sortedPosts = data.sort((a, b) => b.likes.length - a.likes.length);
        
        setPosts(sortedPosts);
      } catch (err:any) {
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

  if (posts.length === 0) return null;

  return (
    <div className="bg-gray-900 py-12 px-8 font-sans mb-[20px] rounded-md">
      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
      <div className="max-w-6xl mx-auto mb-8 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 border border-gray-700 shadow-2xl">
        <div className="flex items-center space-x-3 mb-8">
          <TrendingUp className="h-8 w-8 text-orange-500" />
          <h2 className="text-3xl font-bold text-white">Trending Now</h2>
        </div>
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
          {posts.slice(0, 5).map((post,id) => (
            <TrendingPostCard key={id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;
