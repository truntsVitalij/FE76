import { Outlet, useNavigate } from "react-router";

import { MainLayout } from "./layouts/MainLayout"

import './App.css';
import { useEffect } from "react";

export type TAppPages = 'BlogList' | 'SignIn' | 'SignUp';


function App() {
  // const navigate = useNavigate();

  return (
    <div id="app">

      <h1>APPLICATION</h1>
    </div>
  )
}

export default App
