import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authActions from '../Redux/slices/auth.slice';
import { useAppDispatch } from '../Redux/hooks';
import axios from 'axios';
import { Loader } from './Loader';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  const clearForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError('');
    setPasswordError('');
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError('');
    setPasswordError('');
    setPassword(e.target.value);
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError('');
    if (!emailRegex.test(email.trim())) {
      setEmailError('Please enter correct email');
      return;
    }
    if (!email.trim()) {
      setEmailError('Please enter your email');
      return;
    }

    if (!password.trim()) {
      setPasswordError('Please enter your password');
      return;
    }

    if (password.trim().length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://login-8-gu10.onrender.com/auth/signup",
        {
          email,
          password,
        }
      );
      const token = response.data.token;

      localStorage.setItem(
        'user',
        JSON.stringify({ email, access_token: token }),
      );
      dispatch(
        authActions.setAuthenticatedUser({
          email: email,
          access_token: token,
        }),
      );
      clearForm();
      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__img" />

      <div className="login__form">
        {loading && <Loader />}
        <h2 className="login__title">Sign Up</h2>
        <form>
          <div className="login__inputs">
            <div>
              <div className="login__label">
                <label className="label" htmlFor="email">
                  Email:
                </label>
              </div>

              <input
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => handleEmailChange(e)}
              />
              {emailError && <p className="error-message">{emailError}</p>}
            </div>

            <div className="login__input">
              <div className="login__label">
                <label className="label" htmlFor="password">
                  Password:
                </label>
              </div>

              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => handlePasswordChange(e)}
              />
              {passwordError && (
                <p className="error-message">{passwordError}</p>
              )}
            </div>
          </div>

          <button
            type="button"
            className="login__btn"
            onClick={(e) => handleLogin(e)}
          >
            Sign Up
          </button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};
