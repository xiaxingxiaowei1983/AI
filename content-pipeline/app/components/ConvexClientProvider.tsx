'use client';

import React, { ReactNode } from 'react';
import { ConvexProvider } from 'convex/react';
import { convexClient } from '../lib/convex';

interface ConvexClientProviderProps {
  children: ReactNode;
}

const ConvexClientProvider: React.FC<ConvexClientProviderProps> = ({ children }) => {
  return (
    <ConvexProvider client={convexClient}>
      {children}
    </ConvexProvider>
  );
};

export default ConvexClientProvider;