import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryOptionList from './CategoryOptionList';
import Sidebar from './Sidebar';

export default function NewThoughtForm(props) {
  const date = new Date();
  const today = date.toISOString().split('T')[0];
  const navigate = useNavigate();
  const defaultFormData = {
    category: '',
    date: today,
    content: '',
  };

  const [formData, setFormData] = useState(defaultFormData);

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.addThought(formData);
    setFormData(defaultFormData);
    navigate('/dashboard');
  }

  return (
    <div className="app">
      <Sidebar setUser={props.setUser} />
      <div className="app-container">
        <form className="thought-form" onSubmit={handleSubmit}>
          <label htmlFor="category">Category</label>
          <CategoryOptionList
            categories={props.categories}
            formData={formData}
            handleChange={handleChange}
          />

          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            onChange={handleChange}
            value={formData.date}
          />

          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            placeholder="Start your thought here..."
            cols="50"
            rows="10"
            onChange={handleChange}
            value={formData.content}
            required
          />
          <button>Add thought</button>
        </form>
        <p className="background-photo-credit">
          Photo by Paul Gilmore on{' '}
          <a href="https://unsplash.com/photos/8kDOOrs608I">Unsplash</a>
        </p>
      </div>
    </div>
  );
}
