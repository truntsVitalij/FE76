import { StrictMode } from "react";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import { createRoot } from 'react-dom/client'

import { Provider } from "react-redux";
import { store } from "./store";

import App from "./App";

import { HomePage } from "./pages/HomePage/HomePage";
import { BlogPage } from "./pages/BlogPage/BlogPage";
import { ArticlePage } from './pages/ArticlePage';
import AddPostPage from "./pages/AddPostPage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ResetPasswordNextPage from "./pages/ResetPasswordNextPage";
import NewPasswordPage from "./pages/NewPasswordPage/NewPaswordPage";
import { SearchPage } from "./pages/SearchPage/SearhPage";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        {/* <Route index element={<Navigate to="/sign-in" replace />} />   temporarily */}
        <Route path='blog' element={<BlogPage />} /> 
        <Route path='article/:id' element={<ArticlePage />} /> 
        <Route path='search' element={<SearchPage />} />
        <Route path='add-post' element={<AddPostPage />} />

        <Route path='sign-in' element={<LoginPage />} />
        <Route path='sign-up' element={<RegisterPage />} /> 
        
        <Route path="reset-password" element={<ResetPasswordPage/>}/>
        <Route path="reset-password-next" element={<ResetPasswordNextPage/>}/>
        <Route path="new-password" element={<NewPasswordPage/>} />
        <Route path='*' element={<NotFoundPage/>} />

          {/* когда в браузере будет использоваться путь "/", пойдет рисовать эт элемент {<App />} */}
          
        </Route>
      </Routes>
      
    </BrowserRouter>

    </Provider>
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
//         <Route path='sign-up' element={<RegisterPage />} /> 

//           {/* когда в браузере будет использоваться путь "/", пойдет рисовать эт элемент {<App />} */}
          
//         </Route>
//       </Routes>
      
//     </BrowserRouter>
//   </StrictMode>,
// );
