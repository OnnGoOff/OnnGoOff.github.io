import { Box } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import About from './About';
import DevProfiles from './DevProfiles';
import Hero from './Hero';
import NavBar from './NavBar';

export const navItems = [
  { name: 'Home', hash: 'hero', color: 'brand.persian-green' },
  { name: 'Dev Pages', hash: 'dev-profiles', color: 'brand.yellow-crayola' },
  { name: 'About', hash: 'about', color: 'brand.charcoal-black' },
];

interface HomePageContextProps {
  setPage: (n: number) => void;
}
export const HomePageContext = React.createContext<HomePageContextProps>({ setPage: (n: number) => {} });

const HomePage = () => {
  const [currentColor, setCurrentColor] = useState('brand.persian-green');
  const [currentNav, setCurrentNav] = useState(0);

  const setPage = (x: number) => {
    setCurrentNav(x);
    document.getElementById(navItems[x].hash)?.scrollIntoView({ behavior: 'smooth' });
    setCurrentColor(navItems[x].color);
  };

  useEffect(() => {
    const handlePageScroll = (e: WheelEvent) => {
      e.preventDefault();
      let x = currentNav;
      if (e.deltaY > 0) {
        // scroll down
        if (currentNav + 1 <= navItems.length - 1) {
          x = currentNav + 1;
        }
      } else {
        // scroll up
        if (currentNav - 1 >= 0) {
          x = currentNav - 1;
        }
      }
      setPage(x);
    };

    document.addEventListener('wheel', handlePageScroll, { passive: false });
    return () => {
      document.removeEventListener('wheel', handlePageScroll);
    };
  }, [currentNav]);

  return (
    <>
      <HomePageContext.Provider value={{ setPage }}>
        <NavBar />
      </HomePageContext.Provider>
      <Box transition="background-color 0.25s ease-in-out" bg={currentColor}>
        <Hero />
        <DevProfiles />
        <About />
      </Box>
    </>
  );
};

export default HomePage;
