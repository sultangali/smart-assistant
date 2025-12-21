import React from 'react';
import HeroSection from '../components/Landing/HeroSection';
import AboutSection from '../components/Landing/AboutSection';
import FilterSection from '../components/Landing/FilterSection';
import FeedbackSection from '../components/Landing/FeedbackSection';
import ContactSection from '../components/Landing/ContactSection';

const Home = () => {
  return (
    <div className="home-container" style={{ paddingTop: 0 }}>
      <HeroSection />
      <AboutSection />
      <FilterSection />
      <FeedbackSection />
      <ContactSection />
    </div>
  );
};

export default Home;
