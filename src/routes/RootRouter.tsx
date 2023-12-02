import React from 'react';
import { Route, Routes } from 'react-router';

import { Home } from '@/pages';

export const RootRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
