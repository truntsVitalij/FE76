import { BrowserRouter, Route, Routes } from "react-router";

import SignIn from "@/pages/sign-in";
import Home from "@/pages/home";
import Playlist from "@/pages/playlist";

import { SIGN_IN } from "./const";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={SIGN_IN} element={<SignIn />} />
        <Route path="/" element={<Home />}>
          <Route path={"/playlists/:id"} element={<Playlist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
