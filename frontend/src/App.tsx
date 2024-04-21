import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LogIn } from './components/LogInForm';
import { Header } from './components/Header';
import './styles/styles.scss';
import { HomePage } from './components/HomePage';
import { useAppDispatch } from './Redux/hooks';
import * as authActions from './Redux/slices/auth.slice';
import * as dealsActions from './Redux/slices/deals.slice';
import { SignUp } from './components/SignUp';
import { NotFoundPage } from './components/NotFoundPage';

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch(authActions.setAuthenticatedUser(JSON.parse(user)));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(dealsActions.initDeals());
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path={'/signUp'} element={<SignUp />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
