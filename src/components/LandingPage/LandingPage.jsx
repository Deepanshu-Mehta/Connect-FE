import Hero from './Hero';
import Features from './Features';
import Stats from './Stats';
import CTA from './CTA';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-900">
          <Hero />
          <Features />
          <Stats />
          <CTA />
        </div>
      );
}

export default LandingPage