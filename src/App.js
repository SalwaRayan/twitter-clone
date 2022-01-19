import React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import GlobalFonts from './fonts/fonts'

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Homepage from "./pages/Homepage";
import Follow from "./pages/Follow";
import Tweet from "./pages/Tweet";
import User from "./pages/User";
import UserList from "./pages/UserList";
import NotFound from "./pages/NotFound";


const App = () => {
  return (
    <BrowserRouter>
      <GlobalFonts />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/:idUser/user" element={<User />} />
        <Route path="/:idUser/:idTweet/tweet" element={<Tweet />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/:idUser/follow" element={<Follow />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App
