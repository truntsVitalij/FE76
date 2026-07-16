import { Outlet } from "react-router-dom";

import "./App.css";
import { MainLayout } from "./components/Layouts/MainLayout";
import { ImagePreview } from "./components/ImagePreview/ImagePreview";

function App() {
  return (
    <div id="app">
      <MainLayout>
        <Outlet />
        <ImagePreview/>
      </MainLayout>
    </div>
  );
}

export default App;

//работа по урокам (для себя)
// import { MainLayout } from "./components/Layout";
// import { Outlet, useNavigate } from "react-router";
// import { useEffect, useState } from "react";
// // import {AppRoutes} from "./routes/AppRoutes";

// // import LoginPage from "./pages/LoginPage SignIn";
// // import RegisterPage from "./pages/RegisterPage SignUp";
// // import NotFound from "./pages/NotFound";
// // import { Blog } from "./pages/Blog";

// import "./App.css";
// import { AuthLayout } from "./components/AuthLayout";

// //export type TAppPages = "BlogList" | "SignIn" | "SignUp";

// // const getActivePageComponent = (activePage) => {
// //   switch (activePage) {
// //     case 'SignIn':
// //     return LoginPage
// //     case 'SignUp':
// //     return RegisterPage
// //     default:
// //     return NotFound;
// //   }
// //   }

// function App() {
//   // const [activePage, setActivePage] = useState<TAppPages>("SignIn");

//   // useEffect(() => {              //заменили на Routes
//   //   if (window.location.pathname === '/blog') {
//   //    // setActivePage ('BlogList');
//   //   }
//   // },[])

//   // const CurrentComponent = useMemo (() => getActivePageComponent(activePage), [activePage]);  //useMemo - чтобы страница не переписывалась каждый раз

//   // const changeActivePage = (page: TAppPages) => {
//   //   setActivePage(page);
//   // };

//   // const navigate = useNavigate();
//   // useEffect(() => {
//   //   if (localStorage.getItem('alex')) {
//   //     navigate('/blog')
//   //   }
//   // }, [])

//   return (
//     <div id="app">
//       <MainLayout>
//         {/* {activePage === "SignIn" ? (
//           <LoginPage onClick={changeActivePage} />
//         ) : activePage === "SignUp" ? (
//           <RegisterPage onClick={changeActivePage} />
//         ) : activePage === "BlogList" ? (
//           <Blog />
//         ) : (
//           <NotFound />
//         )} */}

//         <Outlet />
//         {/* вложенные роуты, для routes */}

//       </MainLayout>
//       <AuthLayout>
//         <Outlet />
//       </AuthLayout>
//     </div>

//     // <>
//     //   <AppRoutes>

//     // </AppRoutes>
//     // </>
//   );
// }

// export default App;
