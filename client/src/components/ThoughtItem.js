import React from 'react';

export default function ThoughtItem(props) {
  const favorite = props.isFavorite
    ? './icons/favorite-icon-filled.svg'
    : './icons/favorite-icon.svg';
  return (
    <div className="thought-item">
      <div className="thought-info">
        <h3>{props.date}</h3>
        <div>{props.category}</div>
      </div>
      <div className="thought-content">{props.content}</div>
      <div className="thought-edit">
        <div onClick={() => props.clickEditButton(props.id)}>
          <img src="./icons/edit-icon.svg" alt="edit icon" />
        </div>
        <div onClick={() => props.toggleFavorite(props.id, props.isFavorite)}>
          <img src={favorite} alt="favorite icon" />
        </div>
        <div onClick={() => props.deleteThought(props.id)}>
          <img src="./icons/delete-icon.svg" alt="delete icon" />
        </div>
      </div>
    </div>
  );
}
