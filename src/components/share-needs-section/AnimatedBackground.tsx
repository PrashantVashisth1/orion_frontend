// // Animated background component
// export const AnimatedBackground = () => (
//   <div className="fixed inset-0 overflow-hidden pointer-events-none">
//     <div className="absolute -top-1/2 -left-1/2 w-full h-full">
//       <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
//       <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
//       <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
//     </div>
//   </div>
// );

export const AnimatedBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-purple-200/30 blur-3xl animate-pulse"></div>
    <div className="absolute top-[10%] right-[0%] w-[60%] h-[60%] rounded-full bg-blue-200/30 blur-3xl animate-pulse animation-delay-2000"></div>
    <div className="absolute bottom-[0%] left-[20%] w-[50%] h-[50%] rounded-full bg-pink-200/30 blur-3xl animate-pulse animation-delay-4000"></div>
    
    {/* Subtle grid overlay for texture */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
  </div>
);