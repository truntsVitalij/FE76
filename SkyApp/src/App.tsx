import { useState } from 'react'
// import {AppRoutes} from "./routes/AppRoutes";

import { MainLayout } from "./components/Layout"
import LoginPage from "./pages/LoginPage SignIn";
import RegisterPage from "./pages/RegisterPage SignUp";
import NotFound from "./pages/NotFound";

import './App.css'

export type TAppPages = 'SignIn' | 'SignUp'; 

// const getActivePageComponent = (activePage) => {
//   switch (activePage) {
//     case 'SignIn':
//     return LoginPage
//     case 'SignUp':
//     return RegisterPage
//     default: 
//     return NotFound;
//   }
//   }

function App() {
  const [activePage, setActivePage] = useState <TAppPages> ('SignIn');

  // const CurrentComponent = useMemo (() => getActivePageComponent(activePage), [activePage]);  //useMemo - чтобы страница не переписывалась каждый раз

  const changeActivePage =(page: TAppPages) => {
    setActivePage (page);
  }

  return (
    <div id="app">

      <MainLayout>
          
          {activePage === 'SignIn' ? 
          <LoginPage onClick={changeActivePage}/> : activePage === 'SignUp' ? <RegisterPage onClick={changeActivePage}/> : <NotFound/>}
          
      </MainLayout>

    </div>

    // <>
    //   <AppRoutes>

    // </AppRoutes>
    // </>
  )
}

export default App
