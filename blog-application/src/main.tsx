import { BrowserRouter, Route, Routes } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';

import { Blog } from './pages/Blog/Blog.tsx';
import SignIn from './pages/SignIn/SignIn.tsx';
import SignUp from './pages/SignUp/SignUp.tsx';
import { BlogList } from './pages/BlogList/index.ts';
import { NotFound } from './pages/NotFound/NotFound.tsx';
import App from './App.tsx'
import { MainLayout } from './layouts/MainLayout/MainLayout.tsx';

const initialState = {
  balance: 0,
}

// action - { type: 'WITHDRAW_MONEY', payload: 100 }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'WITHDRAW_MONEY':
      return {
        balance: state.balance - action.payload
      }
    case 'DEPOSIT_MONEY':
      return {
        balance: state.balance + action.payload
      }
    default:
      return state;
  }

}

const store = createStore(reducer);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<App />} />
            <Route path='blogs' element={<BlogList />} />
            <Route path='blog/:id' element={<Blog />} />
            <Route index element={<SignIn />} />
            <Route path='sign-up' element={<SignUp />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
