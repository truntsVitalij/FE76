import { StrictMode } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createRoot } from 'react-dom/client'

import { Blog } from './pages/Blog/Blog'
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ResetPasswordNextPage from "./pages/ResetPasswordNextPage";
import App from "./App";
import NewPasswordPage from "./pages/NewPasswordPage/NewPaswordPage";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/sign-in" replace />} />   {/* temporarily */}
        <Route path='sign-in' element={<LoginPage />} />
        <Route path='sign-up' element={<RegisterPage />} /> 
        <Route path="reset-password" element={<ResetPasswordPage/>}/>
        <Route path="reset-password-next" element={<ResetPasswordNextPage/>}/>
        <Route path="new-password" element={<NewPasswordPage/>} />
        <Route path='blog' element={<Blog />} /> 
        <Route path='*' element={<NotFoundPage/>} />

          {/* когда в браузере будет использоваться путь "/", пойдет рисовать эт элемент {<App />} */}
          
        </Route>
      </Routes>
      
    </BrowserRouter>
  </StrictMode>,
);

//работа по урокам (для себя)
// import { StrictMode } from "react";
// // import ReactDOM, { createRoot } from "react-dom/client";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { createRoot } from 'react-dom/client'

// import { Blog } from './pages/Blog/Blog'
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import App from "./App";

// // ReactDOM.createRoot(document.getElementById("root")!).render(
//  createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<App />}>
//         <Route path='blog' element={<Blog />} /> 
//         <Route path='sign-in' element={<LoginPage />} /> 
//         <Route path='sing-up' element={<RegisterPage />} /> 

//           {/* когда в браузере будет использоваться путь "/", пойдет рисовать эт элемент {<App />} */}
          
//         </Route>
//       </Routes>
      
//     </BrowserRouter>
//   </StrictMode>,
// );
