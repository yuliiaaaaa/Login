import React from 'react';
import { Button } from './Button';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import * as authActions from '../Redux/slices/auth.slice';

export const Header = () => {
  const { access_token } = useAppSelector((state) => state.authReducer);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(authActions.resetState());
  };
  return (
    <div className="header">
      {location.pathname !== '/login' &&
        location.pathname !== '/signUp' &&
        !access_token && (
          <div className="header__buttons">
            <Button text="Log In" className="login-btn" nav="/login" />
            <Button text="Sign Up" className="signup-btn" nav="/signUp" />
          </div>
        )}
      {access_token && (
        <div className="header__button">
          <Button
            text="Sign Out"
            className="sign-out-btn"
            nav="/"
            handleClick={logout}
          />
        </div>
      )}
    </div>
  );
};
