import { useSelector } from 'react-redux';
import './App.css'
import { MainLayout } from './layouts/main-layout';
import { UserList } from './components/user-list';

function App() {
  const [signMode, setSignMode] = useState('signin');
  const count = useSelector((state: any) => state.counter.value);
  const userList = useSelector((state: any) => state.users.list);

  return (
    <section id="center" style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
      <h1> TEST REDUX APPLICATION </h1>
      <p>Count: {count}</p>
      <MainLayout />
      <UserList list={userList} />

      {
        signMode === 'signin' ? (
          <SignIn onUnExistedAccount={() => setSignMode('signup')} />
        ) : (
          <SignUp />
        )
      }
    </section>
  )
}

export default App

