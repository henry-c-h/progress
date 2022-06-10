import React, { useContext } from 'react';
import ThoughtItem from './ThoughtItem';
import EditThoughtForm from './EditThoughtForm';
import Sidebar from './Sidebar';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function ThoughtList(props) {
  const { user } = useContext(UserContext);

  const thoughtElements = props.data.map((thought) => {
    return (
      <ThoughtItem
        key={thought._id}
        id={thought._id}
        date={thought.date.split('T')[0]}
        content={thought.content}
        category={thought.category.name}
        isFavorite={thought.isFavorite}
        toggleFavorite={props.toggleFavorite}
        deleteThought={props.deleteThought}
        clickEditButton={props.clickEditButton}
      />
    );
  });

  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div className="app">
        <Sidebar setUser={props.setUser} />
        <div className="app-container">
          <div className="thought-list">
            {thoughtElements}
            {props.showEditWindow && (
              <EditThoughtForm
                formData={props.editValues}
                updateThought={props.updateThought}
                categories={props.categories}
                setShowEditWindow={props.setShowEditWindow}
              />
            )}
          </div>
          <p className="background-photo-credit">
            Photo by Paul Gilmore on{' '}
            <a href="https://unsplash.com/photos/8kDOOrs608I">Unsplash</a>
          </p>
        </div>
      </div>
    );
  }
}
