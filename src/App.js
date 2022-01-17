import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import GlobalFonts from './fonts/fonts'


const App = () => {
  return (
    <>
      <GlobalFonts />
      <BrowserRouter>
        <Routes>
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
