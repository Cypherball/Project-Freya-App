/*
React Hook which runs only during the initial render and then sets firstRender flag to false
*/

import { useRef, useEffect } from 'react';

function useFirstRender() {
  const firstRender = useRef(true);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return firstRender.current;
}

export default useFirstRender;
