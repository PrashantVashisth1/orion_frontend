
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
import rajiv from '../../assets/rajiv.png'
import kunal from '../../assets/kunal.png'
import sneha from '../../assets/sneha.png'
import khanna from '../../assets/khanna.png'
import prakash from '../../assets/prakash.png'
import chothani from '../../assets/chothani.png'
// import MentorCard from "../MentorCard";

// const mentors = [
//   { name: "Rajiv Malhotra", field: "Startup Growth & Fundraising", rating: 5, img: rajiv },
//   { name: "Kunal Arora", field: "Legal & Compliance", rating: 4, img: kunal },
//   { name: "Sneha Kapoor", field: "Marketing & Brand Growth", rating: 5, img: sneha },
//   { name: "Kavach Khanna", field: "Career", rating: 4, img: khanna },
//   { name: "Saptarishi Prakash", field: "Design", rating: 4, img: prakash },
//   { name: "Poorvi Chothani", field: "Law", rating: 5, img: chothani },
// ];

// const MentorSection = () => {
//   return (
//     <section className="bg-gray-50 py-20">
//       <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">
//         Meeting the Leading Group of Professionals
//       </h2>
//       <p className="text-center text-gray-600 mb-10">
//         Mentors who have stood ahead in line
//       </p>

//       <div className="px-10">
//         <Swiper
//           slidesPerView={3}
//           spaceBetween={30}
//           pagination={{ clickable: true }}
//           navigation
//           modules={[Pagination, Navigation]}
//           className="mySwiper"
//         >
//           {mentors.slice(0, 3).map((m, i) => (
//             <SwiperSlide key={i}>
//               <MentorCard mentor={m} />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       <h3 className="text-center text-2xl font-semibold text-gray-800 mt-16 mb-2">
//         Other Notable Mentors
//       </h3>
//       <p className="text-center text-gray-600 mb-10">
//         Explore Mentors from other domains as well
//       </p>

//       <div className="px-10">
//         <Swiper
//           slidesPerView={3}
//           spaceBetween={30}
//           pagination={{ clickable: true }}
//           navigation
//           modules={[Pagination, Navigation]}
//         >
//           {mentors.slice(3).map((m, i) => (
//             <SwiperSlide key={i}>
//               <MentorCard mentor={m} />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// };

// export default MentorSection;
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import MentorCard from "../MentorCard";

type Mentor = {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  bg?: string;
};

const leadMentors: Mentor[] = [
  { name: "Rajiv Malhotra", role: "Startup Growth & Fundraising", avatar: rajiv, rating: 5, bg: "cardA" },
  { name: "Kunal Arora", role: "Legal & Compliance", avatar: kunal, rating: 4, bg: "cardB" },
  { name: "Sneha Kapoor", role: "Marketing & Brand Growth", avatar:sneha, rating: 5, bg: "cardC" },
  { name: "Rajiv Malhotra", role: "Startup Growth & Fundraising", avatar: rajiv, rating: 5, bg: "cardA" },
  { name: "Kunal Arora", role: "Legal & Compliance", avatar: kunal, rating: 4, bg: "cardB" },
  { name: "Sneha Kapoor", role: "Marketing & Brand Growth", avatar:sneha, rating: 5, bg: "cardC" },
  // add more leads if needed
];

const otherMentors: Mentor[] = [
  { name: "Kavach Khanna", role: "Career", avatar: khanna, rating: 4, bg: "cardA" },
  { name: "Saptarishi Prakash", role: "Design", avatar: prakash, rating: 4, bg: "cardB" },
  { name: "Poorvi Chothani", role: "Law", avatar: chothani, rating: 5, bg: "cardC" },
  { name: "Rajiv Malhotra", role: "Startup Growth & Fundraising", avatar: rajiv, rating: 5, bg: "cardA" },
  { name: "Kunal Arora", role: "Legal & Compliance", avatar: kunal, rating: 4, bg: "cardB" },
  { name: "Sneha Kapoor", role: "Marketing & Brand Growth", avatar:sneha, rating: 5, bg: "cardC" },
  // add more others if needed
];

const MentorSection: React.FC = () => {
  return (
    <section className="w-full bg-white">
      {/* Leading Group */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Meeting the Leading Group of Professionals
          </h2>
          <p className="text-slate-500 mt-1">Mentors who have stood ahead in line</p>
        </div>

        <div className="relative">
          {/* Swiper container (leading) */}
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1.1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1.3 },
              768: { slidesPerView: 2.1 },
              1024: { slidesPerView: 3 },
            }}
            className="py-6"
            loop={true}
          >
            {leadMentors.map((m, i) => (
              <SwiperSlide key={i} className="flex justify-center">
                <div className="mx-12">
                  <MentorCard mentor={m} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="h-[1px] bg-slate-100" />
      </div>

      {/* Other Notable Mentors */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-12">
        <div className="text-center mb-8">
          <h3 className="text-xl md:text-2xl font-semibold text-slate-800">Other Notable Mentors</h3>
          <p className="text-slate-500 mt-1">Explore Mentors from other domains as well</p>
        </div>

        <div className="relative">
          {/* Swiper container (other) */}
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1.1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1.3 },
              768: { slidesPerView: 2.1 },
              1024: { slidesPerView: 3 },
            }}
            className="py-6 "
            loop={true}
          >
            {otherMentors.map((m, i) => (
              <SwiperSlide key={i} className="flex justify-center">
                <div className="mx-12">
                  <MentorCard mentor={m} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default MentorSection;
