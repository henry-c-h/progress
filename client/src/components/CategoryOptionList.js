import React from 'react';
import CategoryOption from './CategoryOption';

export default function CategoryOptionList(props) {
  const categoryElements = props.categories.map((category) => {
    return (
      <CategoryOption
        key={category._id}
        id={category._id}
        name={category.name}
      />
    );
  });

  return (
    <select
      name="category"
      id="category"
      onChange={props.handleChange}
      value={props.formData.category._id || props.formData.category}
      required
    >
      <option value="">-- choose --</option>
      {categoryElements}
    </select>
  );
}
