// import { Button } from "@/components/ui/button";
// import { ArrowRight, Loader2 } from "lucide-react"; // Import Loader2

// // 1. Add isLoading and other Button props
// interface SubmitButtonProps {
//   onClick: () => void;
//   gradientFrom: string;
//   gradientTo: string;
//   emoji: string;
//   text: string;
//   isLoading?: boolean;
//   disabled?: boolean;
// }

// export const SubmitButton = ({
//   onClick,
//   gradientFrom,
//   gradientTo,
//   emoji,
//   text,
//   isLoading = false, // 2. Set default value
//   disabled = false,  // 3. Accept disabled prop
// }: SubmitButtonProps) => (
//   <div className="pt-8">
//     <Button
//       onClick={onClick}
//       // 4. Disable the button when loading or if explicitly disabled
//       disabled={isLoading || disabled} 
//       className={`w-full h-16 bg-gradient-to-r ${gradientFrom} ${gradientTo} hover:shadow-2xl text-white font-bold text-lg rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed hover:cursor-pointer`}
//     >
//       <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
      
//       {/* 5. Add loading state logic */}
//       <div className="relative z-10 flex items-center justify-center gap-3">
//         {isLoading ? (
//           <>
//             <Loader2 className="w-6 h-6 animate-spin" />
//             <span>POSTING...</span>
//           </>
//         ) : (
//           <>
//             <span className="text-2xl">{emoji}</span>
//             <span>{text}</span>
//             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//           </>
//         )}
//       </div>
//     </Button>
//   </div>
// );

import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";

interface SubmitButtonProps {
  onClick: () => void;
  gradientFrom?: string;
  gradientTo?: string;
  emoji?: string;
  text: string;
  isLoading?: boolean;
}

export const SubmitButton = ({
  onClick,
  gradientFrom = "from-violet-600",
  gradientTo = "to-purple-700",
  emoji = "🚀",
  text,
  isLoading = false,
}: SubmitButtonProps) => (
  <div className="pt-8 pb-4">
    <Button
      onClick={onClick}
      disabled={isLoading}
      className={`
        w-full h-14 bg-gradient-to-r ${gradientFrom} ${gradientTo} 
        hover:shadow-xl hover:scale-[1.01] text-white font-bold text-lg rounded-xl 
        shadow-lg transition-all duration-300 relative overflow-hidden group
      `}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Posting...</span>
        </div>
      ) : (
        <>
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
          <div className="relative z-10 flex items-center justify-center gap-3">
            <span className="text-xl">{emoji}</span>
            <span>{text}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </>
      )}
    </Button>
  </div>
);