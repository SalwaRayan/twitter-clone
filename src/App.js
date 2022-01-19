import React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import GlobalFonts from './fonts/fonts'
import Home from "./pages/Home";
import Homepage from "./pages/Homepage";
import Follow from "./pages/Follow";
import Tweet from "./pages/Tweet";
import User from "./pages/User";
import UserList from "./pages/UserList";


const App = () => {
  return (
    <>
      <GlobalFonts />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/:idUser/user" element={<User />} />
          <Route path="/:idUser/:idTweet/tweet" element={<Tweet />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/:idUser/follow" element={<Follow />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
