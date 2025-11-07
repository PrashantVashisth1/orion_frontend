// // import React from "react";
// import { FaStar } from "react-icons/fa";

// interface Mentor {
//   name: string;
//   field: string;
//   rating: number;
//   img: string;
// }

// const MentorCard = ({ mentor }: { mentor: Mentor }) => {
//   return (
//     <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
//       <img src={mentor.img} alt={mentor.name} className="w-24 h-24 rounded-full mb-4 object-cover" />
//       <h4 className="text-lg font-semibold text-gray-900">{mentor.name}</h4>
//       <p className="text-gray-500 mb-2">{mentor.field}</p>
//       <div className="flex items-center justify-center mb-4">
//         {Array.from({ length: mentor.rating }).map((_, i) => (
//           <FaStar key={i} className="text-yellow-500 mx-0.5" />
//         ))}
//       </div>
//       <div className="flex space-x-4">
//         <button className="border border-gray-400 text-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-100">
//           View Profile
//         </button>
//         <button className="text-blue-600 font-medium hover:underline cursor-pointer">
//           Connect
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MentorCard;
import React from "react";

type MentorProps = {
  name: string;
  role: string;
  avatar: string; // note: use `string` not `String`
  rating: number;
  bg?: string;
};

const bgMap: Record<string, string> = {
  cardA: "bg-[#FFE9D1]",
  cardB: "bg-[#CFF7EB]",
  cardC: "bg-[#DDEBFF]",
};

const MentorCard: React.FC<{ mentor: MentorProps }> = ({ mentor }) => {
  const { name, role, avatar, rating, bg } = mentor;
  const bgClass = bg ? bgMap[bg] ?? "bg-white" : "bg-white";

  return (
    <div
      className={`${bgClass} rounded-2xl p-5 card-shadow w-80 h-50 md:w-64 flex flex-col justify-between`}
      role="group"
    >
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          {/* avatar may be public path (e.g. '/assets/rajiv.png') or imported */}
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1">
          <h4 className="font-semibold text-slate-800">{name}</h4>
          <p className="text-sm text-slate-600 mt-1">{role}</p>

          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span
                  key={idx}
                  className={`text-xs ${idx < rating ? "text-yellow-400" : "text-gray-300"}`}
                  aria-hidden
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-slate-600">({rating})</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button className="text-sm px-3 py-2 border rounded-md">View Profile</button>
        <button className="text-sm px-3 py-2 bg-[#0F172A] text-white rounded-md">Connect</button>
      </div>
    </div>
  );
};

export default MentorCard;
