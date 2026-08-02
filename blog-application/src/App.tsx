import { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';

export type TAppPages = 'BlogList' | 'SignIn' | 'SignUp';

const Comp2 = ({ currentPage }) => {
  return (
    <div>
      <span>{currentPage}</span>
      <Comp3 currentPage={currentPage} />
    </div>
  );
};

const Comp3 = ({ currentPage }) => {
  return <Comp4 currentPage={currentPage} />;
};

const Comp4 = ({ currentPage }) => {
  return <Comp5 currentPage={currentPage} />;
};

const Comp5 = ({ currentPage }) => {
  return <div>{currentPage}</div>;
};

function App() {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.balance);

  useEffect(() => {
    dispatch({ type: 'WITHDRAW_MONEY', payload: 100 });
  }, []);

  return (
    <div id="app">

      <h1>APPLICATION</h1>
      {balance}
      <Comp2 currentPage={currentPage} />
    </div>
  )
}

export default App
