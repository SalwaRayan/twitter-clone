import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./contexts/User";

import GlobalFonts from "./fonts/fonts";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Homepage from "./pages/Homepage";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import Tweet from "./pages/Tweet";
import Profile from "./pages/Profile";
import UserList from "./pages/UserList";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalFonts />
      <UserContextProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/:username" element={<Profile />} />
          <Route path="/:username/:idTweet/tweet" element={<Tweet />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/:username/followers" element={<Followers />} />
          <Route path="/:username/following" element={<Following />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App
