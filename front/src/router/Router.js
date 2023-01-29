import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SocketIO from '../pages/socketIO';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SocketIO />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
