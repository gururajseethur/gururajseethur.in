import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SignalEngineContext = createContext({
  sceneState: 'arrival',
  setSceneState: () => {},
  coreIntensity: 1.0,
  setCoreIntensity: () => {},
});

export function SignalEngineProvider({ children }) {
  const location = useLocation();
  const [sceneState, setSceneState] = useState('arrival');
  const [coreIntensity, setCoreIntensity] = useState(1.0);

  // Sync default state based on route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setSceneState('arrival');
    } else if (path.startsWith('/security')) {
      setSceneState('security');
    } else if (path.startsWith('/creative') || path.startsWith('/videos')) {
      setSceneState('creative');
    } else if (path.startsWith('/projects')) {
      setSceneState('ai-lab');
    } else if (path.startsWith('/contact')) {
      setSceneState('contact');
    } else {
      setSceneState('arrival');
    }
  }, [location.pathname]);

  return (
    <SignalEngineContext.Provider
      value={{
        sceneState,
        setSceneState,
        coreIntensity,
        setCoreIntensity,
      }}
    >
      {children}
    </SignalEngineContext.Provider>
  );
}

export function useSignalEngine() {
  return useContext(SignalEngineContext);
}
