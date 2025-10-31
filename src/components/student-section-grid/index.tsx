

// // type Item = { title: string; subtitle?: string; img ?:string; }

// // export default function SectionGrid({ id, title, subtitle, items }: { id: string; title: string; subtitle?: string; items: Item[] }) {
// //   return (
// //     <section id={id} className="py-16">
// //       <h2 className="text-3xl font-extrabold">{title}</h2>
// //       {subtitle && <p className="text-slate-600 max-w-2xl mt-3">{subtitle}</p>}

// //       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
// //         {items.map((it) => (
// //           <article
// //             key={it.title}
// //             className="relative rounded-xl overflow-hidden shadow-lg group"
// //             style={{ minHeight: 180 }}
// //           >
// //             <img
// //               src={it.img}
// //               alt={it.title}
// //               className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
// //             />

// //             <div className="absolute inset-0 flex items-end">
// //               <div className="w-full p-4 bg-gradient-to-t from-slate-900/70 to-transparent text-white">
// //                 <h3 className="font-semibold">{it.title}</h3>
// //                 {it.subtitle && <p className="text-sm opacity-90 mt-1">{it.subtitle}</p>}
// //               </div>
// //             </div>

// //             <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/70" />
// //           </article>
// //         ))}
// //       </div>
// //     </section>
// //   )
// // }

// type Item = { title: string; subtitle?: string; img?: string }

// export default function SectionGrid({
//   id,
//   title,
//   subtitle,
//   items,
// }: {
//   id: string
//   title: string
//   subtitle?: string
//   items: Item[]
// }) {
//   return (
//     <section id={id} className="py-16 relative z-10">
//       <h2 className="text-3xl font-extrabold text-gray-900">{title}</h2>
//       {subtitle && (
//         <p className="text-slate-600 max-w-3xl font-medium mt-3">{subtitle}</p>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
//         {items.map((it) => (
//           <article
//             key={it.title}
//             className="relative rounded-xl overflow-hidden shadow-lg group"
//             style={{ minHeight: 180 }}
//           >
//             <img
//               src={it.img}
//               alt={it.title}
//               className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
//             />

//             <div className="absolute inset-0 flex items-end">
//               <div className="w-full p-4 bg-gradient-to-t from-slate-900/60 to-transparent text-white">
//                 <h3 className="font-semibold inline-block bg-white/40 backdrop-blur-md text-gray-900 px-2 py-1 rounded-md shadow-sm">{it.title}</h3>
//                 {it.subtitle && (
//                   <p className="text-sm opacity-90 mt-1">{it.subtitle}</p>
//                 )}
//               </div>
//             </div>

//             <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/70" />
//           </article>
//         ))}
//       </div>
//     </section>
//   )
// }
// import {
//   Briefcase,
//   GraduationCap,
//   FlaskConical,
//   Cpu,
//   UserCheck,
//   Wand2,
//   Users,
//   Rocket,
//   Megaphone,
//   Lightbulb,
//   Trophy,
//   Puzzle
// } from "lucide-react";
import React from "react";
type Item = {
  title: string;
  subtitle?: string;
  img?: string;
  icon: React.ReactNode;
};

export default function SectionGrid({
  id,
  title,
  subtitle,
  items,
}: {
  id: string;
  title: string;
  subtitle?: string;
  items: Item[];
}) {
  return (
    <section id={id} className="pt-16 pb-8 relative">
      <h2 className="text-3xl font-extrabold text-gray-900">{title}</h2>
      {subtitle && (
        <p className="text-slate-600 max-w-3xl mt-3">
          {subtitle}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        {items.map((it) => (
          <article
            key={it.title}
            className="relative rounded-xl overflow-hidden shadow-lg group"
          >
            <img
              src={it.img}
              alt={it.title}
              className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Icon */}
            {/* <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
              {it.icon}
            </div> */}
            <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
  {React.cloneElement(it.icon as any, { size: 22, color: "#111", strokeWidth: 2.4 })}
</div>


            <div className="absolute inset-0 flex items-end">
              <div className="w-full p-4 bg-gradient-to-t from-slate-900/70 to-transparent text-white">
                <h3 className="font-semibold inline-block bg-white/30 backdrop-blur-md text-gray-900 px-2 py-1 rounded-md shadow-sm">
                  {it.title}
                </h3>
                {it.subtitle && (
                  <p className="text-sm opacity-90 mt-1">{it.subtitle}</p>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
