

import ankur from "../../../assets/Ankur shukla.jpg";
import vivek from "../../../assets/vivek_k.png"
import bhanu from "../../../assets/Bhanu.png"
import jayant from "../../../assets/jayant.jpeg"
import mandal from "../../../assets/ankur_mandal.jpeg"
import saurav from "../../../assets/Saurav.png"
import ashish from "../../../assets/AshishGupta.jpeg"
import jainendra from "../../../assets/JainendraKumar.jpeg"
import vivekananda from "../../../assets/VivekanandaUppunda.png"

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
  link : string;
};

const leadMentors: Mentor[] = [
  { name: "Dr. Ankur Shukla", role: "Prof. Finance & Strategy,IIM Ranchi", avatar: ankur, rating: 5, bg: "cardA",link : 'https://www.linkedin.com/in/ankur-shukla-iimranchi' },
  { name: "Vivek KV", role: "IAS,IIM Calcutta", avatar: vivek, rating: 4, bg: "cardB",link :'https://www.linkedin.com/in/vivek-kv-774bb12b5'  },
  { name: "Bhanu Pratap", role: "Co-founder at Mediversal HealthCare", avatar:bhanu, rating: 5, bg: "cardC",link :'https://www.linkedin.com/in/bhanu-pratap-b2a334a' },
  { name: "Jayant Gandhi", role: "Co-founder at Mediversal HealthCare", avatar: jayant, rating: 5, bg: "cardA",link: 'https://www.linkedin.com/in/jayant-gandhi-18310a16a' },
  { name: "Ankur Mandal", role: "DoppleIQ, IIM Calcutta", avatar: mandal, rating: 4, bg: "cardB",link:'https://www.linkedin.com/in/ankur-mandal-249b6972' },
  { name: "Saurav Kumar", role: "Founder Orion Eduverse, IIM Calcutta", avatar:saurav, rating: 5, bg: "cardC",link :'https://www.linkedin.com/in/saurav-kumar-83b8681a' },
  { name: "Ashish Gupta", role: "Principal Product Manager, Microsoft, IIM Calcutta", avatar:ashish, rating: 5, bg: "cardA",link :'https://www.linkedin.com/in/ash-gupt' },
  { name: "Jainendra Kumar", role: "Senior Dev. Engineer, Microsoft", avatar:jainendra, rating: 5, bg: "cardB",link :'https://www.linkedin.com/in/jainendra20' },
  { name: "Vivekananda ", role: "Co-founder,Aayaama Technologies", avatar:vivekananda, rating: 5, bg: "cardC",link :'https://www.linkedin.com/in/vivekananda-uppunda' },
  // add more leads if needed
];

// const otherMentors: Mentor[] = [
//   { name: "Kavach Khanna", role: "Career", avatar: khanna, rating: 4, bg: "cardA" },
//   { name: "Saptarishi Prakash", role: "Design", avatar: prakash, rating: 4, bg: "cardB" },
//   { name: "Poorvi Chothani", role: "Law", avatar: chothani, rating: 5, bg: "cardC" },
//   { name: "Rajiv Malhotra", role: "Startup Growth & Fundraising", avatar: rajiv, rating: 5, bg: "cardA" },
//   { name: "Kunal Arora", role: "Legal & Compliance", avatar: kunal, rating: 4, bg: "cardB" },
//   { name: "Sneha Kapoor", role: "Marketing & Brand Growth", avatar:sneha, rating: 5, bg: "cardC" },
//   // add more others if needed
// ];

const MentorSection: React.FC = () => {
  return (
    <section className="w-full bg-white">
      {/* Leading Group */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Meet the Leading Group of Professionals
          </h2>
          <p className="text-slate-500 mt-1">Mentors who have stood ahead in line</p>
        </div>

        <div className="relative">
          {/* Swiper container (leading) */}
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={8}
            slidesPerView={1.1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1.3 },
              768: { slidesPerView: 2.1 },
              1024: { slidesPerView: 3 },
            }}
            className="py-6 mentor-swip"
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
      {/* <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="h-[1px] bg-slate-100" />
      </div> */}

      {/* Other Notable Mentors */}
      {/* <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        <div className="text-center mb-8">
          <h3 className="text-xl md:text-2xl font-semibold text-slate-800">Other Notable Mentors</h3>
          <p className="text-slate-500 mt-1">Explore Mentors from other domains as well</p>
        </div>

        <div className="relative">
          {/* Swiper container (other) */}
          {/* <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={8}
            slidesPerView={1.1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1.3 },
              768: { slidesPerView: 2.1 },
              1024: { slidesPerView: 3 },
            }}
            className="py-6 mentor-swip"
            loop={true} */}
          {/* > */}
            {/* {otherMentors.map((m, i) => (
              <SwiperSlide key={i} className="flex justify-center">
                <div className="mx-12">
                  <MentorCard mentor={m} />
                </div>
              </SwiperSlide>
            ))} */}
          {/* </Swiper> */}
        {/* </div>
      </div> */}
    </section>
  );
};

export default MentorSection;
