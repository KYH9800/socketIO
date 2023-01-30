import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Room from '../pages/room';
import Chat from '../pages/chat';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/room" element={<Room />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
