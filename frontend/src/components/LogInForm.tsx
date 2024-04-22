import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as authActions from '../Redux/slices/auth.slice';
import { useAppDispatch } from '../Redux/hooks';
import { Loader } from './Loader';
import axios from 'axios';

export const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const dispatch = useAppDispatch();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
    setError('');
  };

  const clearForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors();
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors();
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
        "https://login-9.onrender.com/auth/login",
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
      console.error('Login error:', error.response.data.message);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post("https://login-9.onrender.com/auth/forgot-password", {
        email,
      });
      setError('Reset password email sent successfully');
    } catch (err) {
      setError('Failed to send reset password email');
    } finally {
      setLoading(false);
    }
  };

  const handleModeChange = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setForgotPasswordMode(!forgotPasswordMode);
  };

  return (
    <div className="login">
      <div className="login__img" />

      <div className="login__form">
        {loading && <Loader />}
        <h2 className="login__title">
          {forgotPasswordMode ? 'Reset Password' : 'Login'}
        </h2>
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
                id="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && <p className="error-message">{emailError}</p>}
            </div>

            {!forgotPasswordMode && (
              <div>
                <div className="login__label">
                  <label className="label" htmlFor="password">
                    Password:
                  </label>
                </div>

                <input
                  type="password"
                  id="password"
                  className="input"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {passwordError && (
                  <p className="error-message">{passwordError}</p>
                )}
              </div>
            )}

            <div className="login__link">
              <a href="#" className="link" onClick={(e) => handleModeChange(e)}>
                {forgotPasswordMode ? 'Back to Login' : 'Forgot password?'}
              </a>
            </div>
          </div>

          {!forgotPasswordMode && (
            <button
              type="button"
              className="login__btn"
              onClick={handleLogin}
              disabled={loading}
            >
              Sign In
            </button>
          )}

          {forgotPasswordMode && (
            <button
              type="button"
              className="login__btn"
              onClick={handleResetPassword}
              disabled={loading}
            >
              Reset Password
            </button>
          )}
        </form>
        <div className="login__text">
          Don’t have an account?
          <NavLink className="link" to="/signUp">
            Sign Up
          </NavLink>
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};
