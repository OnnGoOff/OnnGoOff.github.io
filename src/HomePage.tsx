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
  goToPage: (page: number) => void;
}
export const HomePageContext = React.createContext<HomePageContextProps>({ goToPage: (page: number) => {} });

const HomePage = () => {
  const [currentNav, setCurrentNav] = useState(0);
  const [ticking, setTicking] = useState(false);
  const [currentColor, setCurrentColor] = useState('brand.persian-green');

  const goToPage = useCallback((page: number) => {
    window.history.pushState(null, '', `#${navItems[page].hash}`);
    // window.location.hash = navItems[page].hash; // instant scroll
    document.getElementById(navItems[page].hash)?.scrollIntoView({ behavior: 'smooth' });
    setCurrentColor(navItems[page].color);
  }, []);

  useEffect(() => {
    const handlePageScroll = (e: WheelEvent) => {
      e.preventDefault();
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (e.deltaY > 0) {
            // scroll down
            setCurrentNav((curr) => {
              if (curr + 1 > navItems.length - 1) {
                goToPage(curr);
                return curr;
              } else {
                goToPage(curr + 1);
                return curr + 1;
              }
            });
          } else {
            // scroll up
            setCurrentNav((curr) => {
              if (curr - 1 < 0) {
                goToPage(curr);
                return curr;
              } else {
                goToPage(curr - 1);
                return curr - 1;
              }
            });
          }
          setTicking(false);
        });
        setTicking(true);
      }
    };

    document.addEventListener('wheel', handlePageScroll, { passive: false });

    return () => {
      document.removeEventListener('wheel', handlePageScroll);
    };
  }, [currentNav, goToPage, ticking]);

  return (
    <>
      <HomePageContext.Provider value={{ goToPage }}>
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
