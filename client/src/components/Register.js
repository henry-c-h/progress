import React, { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function Register() {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [flashMessage, setFlashMessage] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  function handleRegister(e) {
    e.preventDefault();
    fetch('https://progress-app.herokuapp.com/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
      }),
      credentials: 'include',
    });
    navigate('/login');
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
          <form className="register-form" onSubmit={handleRegister}>
            {flashMessage ? (
              <div className="flash-message">{flashMessage}</div>
            ) : (
              <></>
            )}
            <div className="form-row">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="usernam"
                onChange={(e) => setRegisterUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setRegisterPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                onChange={(e) =>
                  e.target.value === registerPassword
                    ? setFlashMessage('')
                    : setFlashMessage('Passwords do not match')
                }
                required
              />
            </div>
            <button>Sign up</button>
            <p className="auth-redirect">
              Already registered? <a href="/login">Log in.</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
