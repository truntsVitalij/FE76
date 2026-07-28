import { BrowserRouter, Route, Routes } from "react-router";

import SignIn from "../pages/sign-in";
import Home from "../pages/home";

import { SIGN_IN } from "./const";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path={SIGN_IN} element={<SignIn />} />
            </Routes>
        </BrowserRouter>
    )
}