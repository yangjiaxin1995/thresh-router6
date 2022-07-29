import React, { useMemo } from 'react';
import { NavigationContext } from './Context';

const Router = ({ naviagtor, location, children }) => {
  const navigationContext = useMemo(() => {
    return { naviagtor, location };
  }, [naviagtor, location]);

  return (
    <NavigationContext.Provider value={navigationContext}>
      {children}
    </NavigationContext.Provider>
  );
};

export default Router;
