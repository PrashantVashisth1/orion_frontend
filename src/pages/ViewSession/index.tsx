import Navbarpostlogin from '@/components/postlogincomponents/Navbarpostlogin'
import Footer from '@/components/postlogincomponents/footer'
import HeroSlider from '@/components/ViewSessionComponents/HeroSlider'
import SessionsSection from '@/components/ViewSessionComponents/SessionSection'

function ViewSession() {
  return (
 <div className="min-h-screen bg-slate-900">
  <Navbarpostlogin />
   
      <HeroSlider />
      <SessionsSection />
      <Footer />
    </div>
  )
}

export default ViewSession