import { useState } from "react";
import { MainLayout } from "./layouts/MainLayout"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import { NotFound } from "./pages/NotFound";

import './App.css';

export type TAppPages = 'BlogList' | 'SignIn' | 'SignUp';

// const getActivePageComponent = (activePage) => {
//   switch (activePage) {
//     case 'SignIn':
//       return SignIn
//     case 'SignUp':
//       return SignUp
//     default:
//       return NotFound;
//   }
// }

function App() {
  const [activePage, setActivePage] = useState<TAppPages>('SignIn');

  // const CurrentComponent = useMemo(() => getActivePageComponent(activePage), [activePage]);

  const changeActivePage = (page: TAppPages) => {
    setActivePage(page);
  }

  return (
    <div id="app">

      <MainLayout>
        {
          activePage === 'SignIn' ?
            <SignIn onClick={changeActivePage} onAlreadyAuthorized={() => changeActivePage('BlogList')} /> :
            activePage === 'SignUp' ?
              <SignUp onClick={changeActivePage} /> :
              <NotFound />
        }
      </MainLayout>
    </div>
  )
}

export default App
