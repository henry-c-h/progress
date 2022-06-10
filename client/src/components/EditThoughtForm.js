import React, { useState } from 'react';
import CategoryOptionList from './CategoryOptionList';

export default function EditThoughtForm(props) {
  const [formData, setFormData] = useState(props.formData);

  function handleSubmit(event) {
    event.preventDefault();
    props.updateThought(formData);
  }

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function cancelEdit(event) {
    event.preventDefault();
    props.setShowEditWindow((prev) => !prev);
  }

  return (
    <div className="overlay">
      <form className="thought-form edit-form">
        <label htmlFor="category">Category</label>
        <CategoryOptionList
          categories={props.categories}
          handleChange={handleChange}
          formData={formData}
        />
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          onChange={handleChange}
          value={formData.date.split('T')[0]}
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
        <div className="edit-buttons">
          <button onClick={handleSubmit}>Confirm edit</button>
          <button onClick={cancelEdit}>Cancel edit</button>
        </div>
      </form>
    </div>
  );
}
