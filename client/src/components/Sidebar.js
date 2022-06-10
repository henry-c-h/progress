import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(UserContext);

  function handleLogout() {
    fetch('/auth/logout');
    logoutUser();
    navigate('/login');
  }

  return (
    <nav className="sidebar">
      <h2 className="logo">
        <img src="./icons/idea-icon.svg" alt="idea icon" />
        <span>Progress</span>
      </h2>
      <ul>
        <NavLink
          className={({ isActive }) => {
            return isActive ? 'nav-selected' : 'nav-unselected';
          }}
          to="/dashboard"
        >
          <li>All thoughts</li>
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive ? 'nav-selected' : 'nav-unselected';
          }}
          to="/add"
        >
          <li>Add new thought</li>
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive ? 'nav-selected' : 'nav-unselected';
          }}
          to="/favorites"
        >
          <li>My favorites</li>
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive ? 'nav-selected' : 'nav-unselected';
          }}
          to="/edit-categories"
        >
          <li>Edit categories</li>
        </NavLink>
      </ul>
      <div className="logout">
        <p>Hello, {user.username}</p>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </nav>
  );
}
