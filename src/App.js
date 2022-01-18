import React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import GlobalFonts from './fonts/fonts'
import Home from "./pages/Home";
import Homepage from "./pages/Homepage";


const App = () => {
  return (
    <>
      <GlobalFonts />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
