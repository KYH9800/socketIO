import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Socket from '../pages/socketIO';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Socket />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
