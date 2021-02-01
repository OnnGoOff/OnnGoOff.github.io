import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
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

function getOffset(el: Element | null) {
  if (el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
      bottom: rect.bottom + window.scrollY,
    };
  } else {
    return {
      left: 0,
      top: 0,
      bottom: 0,
    };
  }
}

const HomePage = () => {
  const [currentColor, setCurrentColor] = useState('brand.persian-green');
  const currentNav = useRef(0);
  const prevTimestamp = useRef(0);

  const setPage = (x: number) => {
    document.getElementById(navItems[x].hash)?.scrollIntoView({ behavior: 'smooth' });
    setCurrentColor(navItems[x].color);
    currentNav.current = x;
  };

  const setPageMobile = (x: number) => {
    // document.getElementById(navItems[x].hash)?.scrollIntoView({ behavior: 'auto' });
    setCurrentColor(navItems[x].color);
    currentNav.current = x;
  };

  const handlePageScroll = (e: WheelEvent) => {
    setPage(currentNav.current);
    e.preventDefault();
    window.requestAnimationFrame((time) => {
      if (time - prevTimestamp.current > 250) {
        let x = currentNav.current;
        if (e.deltaY > 0) {
          // scroll down
          if (currentNav.current + 1 <= navItems.length - 1) {
            x = x + 1;
          }
        } else {
          // scroll up
          if (currentNav.current - 1 >= 0) {
            x = x - 1;
          }
        }
        setPage(x);
        prevTimestamp.current = time;
      }
    });
  };

  const handleMobileScroll = (e: Event) => {
    window.requestAnimationFrame((time) => {
      const pageOffset = getOffset(document.getElementById(navItems[currentNav.current].hash));
      console.log(pageOffset.bottom, pageOffset.top, window.pageYOffset);
      if (window.pageYOffset >= pageOffset.bottom - 200) {
        setPageMobile(currentNav.current + 1);
      } else if (window.pageYOffset < pageOffset.top - 200) {
        setPageMobile(currentNav.current - 1);
      }
    });
  };

  useEffect(() => {
    if (window.outerHeight > 828) {
      document.addEventListener('wheel', handlePageScroll, { passive: false });
    } else {
      document.addEventListener('scroll', handleMobileScroll, { passive: false });
    }
    return () => {
      if (window.outerHeight > 828) {
        document.removeEventListener('wheel', handlePageScroll);
      } else {
        document.removeEventListener('scroll', handleMobileScroll);
      }
    };
  });

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
