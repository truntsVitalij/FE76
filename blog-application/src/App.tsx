import { useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router';

export type TAppPages = 'BlogList' | 'SignIn' | 'SignUp';

function App() {
  const dispatch = useDispatch();
  // const balance = useSelector((state) => state.balance);

  useEffect(() => {
    dispatch({ type: 'WITHDRAW_MONEY', payload: 100 });
  }, []);

  return (
    <div id="app">

      <h1>APPLICATION</h1>
      <Link to="/blogs">BlogList</Link>
    </div>
  )
}

export default App
