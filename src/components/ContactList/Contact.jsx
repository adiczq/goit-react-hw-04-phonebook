import React from 'react';
import css from './ContactList.module.css';

const Contact = ({ contact, onDeleteContact }) => {
  const { id, name, number } = contact;

  const handleDelete = () => {
    onDeleteContact(id);
  };

  return (
    <li className={css.contact}>
      {name} - {number}{' '}
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
};

export default Contact;
