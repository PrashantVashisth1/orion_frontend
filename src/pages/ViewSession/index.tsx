// import Navbarpostlogin from '@/components/postlogincomponents/Navbarpostlogin'
// import Footer from '@/components/postlogincomponents/footer'
// import HeroSlider from '@/components/ViewSessionComponents/HeroSlider'
// import SessionsSection from '@/components/ViewSessionComponents/SessionSection'

// function ViewSession() {
//   return (
//  <div className="min-h-screen bg-slate-900">
//   <Navbarpostlogin />
   
//       <HeroSlider />
//       <SessionsSection />
//       <Footer />
//     </div>
//   )
// }

// export default ViewSession

// src/pages/ViewSession/index.tsx

import Navbarpostlogin from '@/components/postlogincomponents/Navbarpostlogin'
import Footer from '@/components/postlogincomponents/footer'
import HeroSlider from '@/components/ViewSessionComponents/HeroSlider'
import SessionsSection from '@/components/ViewSessionComponents/SessionSection'
import { useAuth } from '@/contexts/AuthContext' // 🟢 IMPORT useAuth

function ViewSession() {
  const { user } = useAuth(); // 🟢 GET USER
  const isStudent = user?.role === 'STUDENT'; // 🟢 CHECK IF USER IS STUDENT

  return (
    <div className="min-h-screen bg-slate-900">
      {!isStudent && <Navbarpostlogin />}
   
      {/* 🟢 PASS PROP TO HIDE HOST BUTTON FOR STUDENTS */}
      <HeroSlider isStudent={isStudent} /> 
      
      <SessionsSection />
      <Footer />
    </div>
  )
}

export default ViewSession