import { BrowserRouter, Route, Routes } from "react-router";

import App from "../App";
import SignIn from "../pages/sign-in";

import { SIGN_IN } from "./const";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<App />} />
                <Route path={SIGN_IN} element={<SignIn />} />
            </Routes>
        </BrowserRouter>
    )
}