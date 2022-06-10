import React, { useState } from 'react';
import Category from './Category';
import Sidebar from './Sidebar';

export default function CategoryList(props) {
  const categoryElements = props.categories.map((category) => {
    return (
      <Category
        key={category._id}
        id={category._id}
        name={category.name}
        deleteCategory={props.deleteCategory}
      />
    );
  });

  const [newCategory, setNewCategory] = useState('');

  function handleChange(event) {
    setNewCategory(event.target.value);
  }

  function handleClick() {
    props.submitCategory(newCategory);
    setNewCategory('');
  }

  return (
    <div className="app">
      <Sidebar setUser={props.setUser} />
      <div className="app-container">
        <div className="category-container">
          <div className="category-adder">
            <input type="text" value={newCategory} onChange={handleChange} />
            <button type="submit" onClick={handleClick}>
              Add category
            </button>
          </div>
          <div className="edit-note">
            <img src="./icons/attention-icon.svg" alt="attention icon" />
            <p>You cannot delete categories with existing thoughts.</p>
          </div>
          <div className="category-display">{categoryElements}</div>
        </div>
        <p className="background-photo-credit">
          Photo by Paul Gilmore on{' '}
          <a href="https://unsplash.com/photos/8kDOOrs608I">Unsplash</a>
        </p>
      </div>
    </div>
  );
}
