import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import GlobalFonts from './fonts/fonts'
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";


const App = () => {
  return (
    <BrowserRouter>
      <GlobalFonts />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App
