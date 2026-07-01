import { StrictMode } from "react";
// import ReactDOM, { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { createRoot } from 'react-dom/client'

import { Blog } from './pages/Blog/Blog'
import LoginPage from "./pages/LoginPage SignIn";
import RegisterPage from "./pages/RegisterPage SignUp";
import App from "./App";

// ReactDOM.createRoot(document.getElementById("root")!).render(
 createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
        <Route path='blog' element={<Blog />} /> 
        <Route path='sign-in' element={<LoginPage />} /> 
        <Route path='sing-up' element={<RegisterPage />} /> 

          {/* когда в браузере будет использоваться путь "/", пойдет рисовать эт элемент {<App />} */}
          
        </Route>
      </Routes>
      
    </BrowserRouter>
  </StrictMode>,
);
