import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function Login() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [flashMessage, setFlashMessage] = useState('');
  const { user, verifyUser } = useContext(UserContext);

  function handleLogin(e) {
    e.preventDefault();
    verifyUser(
      loginEmail,
      loginPassword,
      setLoginEmail,
      setLoginPassword,
      setFlashMessage
    );
  }

  if (user) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="auth-container">
      <div className="auth">
        <div className="auth-image">
          <p className="credit">
            Photo by Paul Gilmore on{' '}
            <a href="https://unsplash.com/photos/EXbGG5dBZKw">Unsplash</a>
          </p>
        </div>
        <div className="auth-form">
          <p className="auth-logo">Progress</p>
          <form className="login-form" onSubmit={handleLogin}>
            {flashMessage ? (
              <div className="flash-message">{flashMessage}</div>
            ) : (
              <></>
            )}
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="form-row">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <button>Log in</button>
            <p className="auth-redirect">
              New here? <a href="/register">Create an account here.</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
