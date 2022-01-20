import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalFonts from "./fonts/fonts";
import { UserContextProvider } from "./contexts/User";

import SignUp from "./pages/SignUp";
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
      <UserContextProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/:username" element={<User />} />
          <Route path="/:username/:idTweet/tweet" element={<Tweet />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/:username/follow" element={<Follow />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App
