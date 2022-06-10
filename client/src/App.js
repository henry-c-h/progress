import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import ThoughtList from './components/ThoughtList';
import NewThoughtForm from './components/NewThoughtForm';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CategoryList from './components/CategoryList';
import { UserContext } from './components/UserContext';

function App() {
  const [thoughts, setThoughts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showEditWindow, setShowEditWindow] = useState(false);
  const [editValues, setEditValues] = useState({});
  const { user } = useContext(UserContext);

  // fetch all thoughts
  useEffect(() => {
    if (user) {
      fetch(`https://progress-app.herokuapp.com/api/users/${user._id}/thoughts`)
        .then((res) => res.json())
        .then((data) => setThoughts(data));
    }
  }, [user]);

  // fetch categories
  useEffect(() => {
    if (user) {
      fetch(`https://progress-app.herokuapp.com/api/users/${user._id}/categories`)
        .then((res) => res.json())
        .then((data) => setCategories(data));
    }
  }, [user]);

  function addThought(formData) {
    fetch(`https://progress-app.herokuapp.com/api/users/${user._id}/thoughts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newThought) =>
        setThoughts((prevThoughts) => {
          return [newThought, ...prevThoughts].sort(sortByDate);
        })
      );
  }

  function toggleFavorite(id, isFavorite) {
    fetch(`https://progress-app.herokuapp.com/api/users/${user._id}/thoughts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isFavorite: !isFavorite }),
    })
      .then((res) => res.json())
      .then(() =>
        setThoughts((prevThoughts) => {
          return prevThoughts.map((thought) => {
            return thought._id === id
              ? { ...thought, isFavorite: !thought.isFavorite }
              : thought;
          });
        })
      );
  }

  function clickEditButton(id) {
    setShowEditWindow((prev) => !prev);
    const editedThought = thoughts.filter((thought) => thought._id === id)[0];
    setEditValues(editedThought);
  }

  function deleteThought(id) {
    fetch(`https://progress-app.herokuapp.com/api/users/${user._id}/thoughts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(() =>
        setThoughts((prevThoughts) => {
          return prevThoughts.filter((thought) => thought._id !== id);
        })
      );
  }

  function sortByDate(a, b) {
    const dateA = a.date;
    const dateB = b.date;
    if (dateA < dateB) {
      return 1;
    }
    if (dateA > dateB) {
      return -1;
    }
    return 0;
  }

  function updateThought(formData) {
    fetch(`https://progress-app.herokuapp.com/api/users/${user._id}/thoughts/${formData._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updatedThought) =>
        setThoughts((prevThoughts) => {
          return prevThoughts
            .map((thought) => {
              return thought._id === updatedThought._id
                ? updatedThought
                : thought;
            })
            .sort(sortByDate);
        })
      );

    setShowEditWindow((prev) => !prev);
  }

  function submitCategory(newCategory) {
    fetch(`https://progress-app.herokuapp.com/api/users/${user._id}/categories/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newCategory }),
    })
      .then((res) => res.json())
      .then((newCat) =>
        setCategories((prevCategories) => [...prevCategories, newCat])
      );
  }

  function deleteCategory(oldCategoryId) {
    const existingThoughts = thoughts.filter(
      (thought) => thought.category._id === oldCategoryId
    );

    if (existingThoughts.length === 0) {
      fetch(`https://progress-app.herokuapp.com/api/users/${user._id}/categories/${oldCategoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then(
          setCategories((prevCategories) =>
            prevCategories.filter((category) => category._id !== oldCategoryId)
          )
        );
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ThoughtList
              data={thoughts}
              toggleFavorite={toggleFavorite}
              deleteThought={deleteThought}
              clickEditButton={clickEditButton}
              showEditWindow={showEditWindow}
              setShowEditWindow={setShowEditWindow}
              editValues={editValues}
              updateThought={updateThought}
              categories={categories}
            />
          }
        />
        <Route
          path="/add"
          element={
            <NewThoughtForm addThought={addThought} categories={categories} />
          }
        />
        <Route
          path="/favorites"
          element={
            <ThoughtList
              data={thoughts.filter((thought) => thought.isFavorite)}
              toggleFavorite={toggleFavorite}
              deleteThought={deleteThought}
              clickEditButton={clickEditButton}
              showEditWindow={showEditWindow}
              setShowEditWindow={setShowEditWindow}
              editValues={editValues}
              updateThought={updateThought}
              categories={categories}
            />
          }
        />
        <Route
          path="/edit-categories"
          element={
            <CategoryList
              categories={categories}
              submitCategory={submitCategory}
              deleteCategory={deleteCategory}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
