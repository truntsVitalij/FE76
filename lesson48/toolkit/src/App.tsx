import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { increment, decrement, selectCounterValue } from "./store/slices/counterSlice";
import { fetchPostList, selectPostList } from "./store/slices/postSlice";
import AppContext from "./context/AppContext";
import { ChangeTheme } from "./components/ChangeTheme";

function App() {
  const dispatch = useAppDispatch();
  const countValue = useAppSelector(selectCounterValue);
  const postList = useAppSelector(selectPostList);

  const { theme } = useContext(AppContext);
  const handleIncrementClick = () => {
    dispatch(increment())
  };

  const handleDecrementClick = () => {
    dispatch(decrement())
  };

  useEffect(() => {
    dispatch(fetchPostList())
  }, [dispatch])

  return (
    <>
      <h1>Hello World</h1>
      <p>{countValue}</p>
      <button onClick={handleIncrementClick}>Increment</button>
      <button onClick={handleDecrementClick}>Decrement</button>

      <h2>
        {theme}
      </h2>
      <ChangeTheme />
      {postList.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </>
  )
}

export default App
