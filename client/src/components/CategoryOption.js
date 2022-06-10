import React from 'react';

export default function CategoryOption(props) {
  return <option value={props.id}>{props.name}</option>;
}
