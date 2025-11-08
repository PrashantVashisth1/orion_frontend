import Navbarpostlogin from '@/components/Students-Components/StudentPostLoginNavbar'
import Footer from '@/components/Students-Components/student-footer'
import HeroSlider from '@/components/Students-Components/ViewSessionComponents/HeroSlider'
import SessionsSection from '@/components/Students-Components/ViewSessionComponents/SessionSection'
import { useAuth } from '@/contexts/AuthContext' // 🟢 IMPORT useAuth

function ViewSession() {
  const { user } = useAuth(); // 🟢 GET USER
  const isStudent = user?.role === 'STUDENT'; // 🟢 CHECK IF USER IS STUDENT

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-purple-50 ">
      <Navbarpostlogin />
   
      {/* 🟢 PASS PROP TO HIDE HOST BUTTON FOR STUDENTS */}
      <HeroSlider isStudent={isStudent} /> 
      
      <SessionsSection />
      <Footer />
    </div>
  )
}

export default ViewSession