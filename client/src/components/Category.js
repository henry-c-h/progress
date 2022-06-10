import React from 'react';

export default function Category(props) {
  return (
    <div className="category">
      {props.name}
      <img
        className="delete-category"
        src="./icons/delete-category.svg"
        alt="delete icon"
        onClick={() => props.deleteCategory(props.id)}
      />
    </div>
  );
}
