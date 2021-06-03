// I sourced this code with help from this article! https://usehooks.com/useWindowSize/
import { useState, useEffect } from 'react';


export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
      });
    
    useEffect(() => {
        function handleResize() {
            setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
            });
        }
        
        window.addEventListener("resize", handleResize);

        handleResize()

        return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}