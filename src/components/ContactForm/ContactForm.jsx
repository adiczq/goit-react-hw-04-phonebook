import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ ...INITIAL_STATE });

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedNumber = localStorage.getItem('number');
    if (storedName) {
      setFormData(prevState => ({ ...prevState, name: storedName }));
    }
    if (storedNumber) {
      setFormData(prevState => ({ ...prevState, number: storedNumber }));
    }
  }, []);

  const handleChange = e => {
    const { value, name, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
    localStorage.setItem(name, value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { name, number } = formData;

    console.log(`name: ${name}, number: ${number}`);

    const newContact = { name, number, id: nanoid() };
    onSubmit(newContact);
    reset();
    localStorage.removeItem('name');
    localStorage.removeItem('number');
  };

  const reset = () => {
    setFormData({ ...INITIAL_STATE });
  };

  const { name, number } = formData;
  return (
    <div className={css.container}>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.label}>
          Name:
          <input
            className={css.login}
            type="text"
            placeholder="Enter name"
            pattern="^[A-Za-z.'\- ]+$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            name="name"
            value={name}
            onChange={handleChange}
          />
        </label>

        <label className={css.label}>
          Number:
          <input
            className={css.login}
            type="tel"
            placeholder="Enter number"
            pattern="^\+?\d{1,4}?\s?\(?\d{1,4}?\)?\s?\d{1,4}\s?\d{1,4}\s?\d{1,9}$"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            name="number"
            value={number}
            onChange={handleChange}
          />
        </label>

        <button className={css.button} type="submit">
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
