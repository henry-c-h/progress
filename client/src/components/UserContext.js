import { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const verifyUser = async (
    loginEmail,
    loginPassword,
    setLoginEmail,
    setLoginPassword,
    setFlashMessage
  ) => {
    const res = await fetch('https://progress-app.herokuapp.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
      credentials: 'include',
    });
    if (res.status === 200) {
      const data = await res.json();
      setUser(data);
      setFlashMessage('');
    } else {
      setFlashMessage('Incorrect email or password');
      setLoginEmail('');
      setLoginPassword('');
    }
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, verifyUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
