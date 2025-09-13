import HeroSection from '@/components/online-session-components/HeroSection';
import ActionCards from '@/components/online-session-components/ActionCards';
import FeaturedSessions from '@/components/online-session-components/FeaturesSessions';

import Footer from '@/components/postlogincomponents/footer';
import Navbarpostlogin from '@/components/postlogincomponents/Navbarpostlogin';

import SessionCard from '@/components/host-sessions/online-session-components/sessionCard';

const OnlineSessionPage: React.FC = () => {
  return (

    
      <div className="min-h-screen bg-slate-900">
      <Navbarpostlogin />  
      <HeroSection />
       <SessionCard />
      <ActionCards />
     
      <FeaturedSessions />
      <Footer />
    </div>
    
  );
};


export default OnlineSessionPage;