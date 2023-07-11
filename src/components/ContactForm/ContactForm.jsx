import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class ContactForm extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    const storedName = localStorage.getItem('name');
    const storedNumber = localStorage.getItem('number');
    if (storedName) {
      this.setState({ name: storedName });
    }
    if (storedNumber) {
      this.setState({ number: storedNumber });
    }
  }

  handleChange = e => {
    const { value, name, type, checked } = e.target;
    this.setState({ [name]: type === 'checkbox' ? checked : value });
    localStorage.setItem(name, value);
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;

    console.log(`name: ${name}, number: ${number}`);

    const newContact = { name, number, id: nanoid() };
    this.props.onSubmit(newContact);
    this.reset();
    localStorage.removeItem('name');
    localStorage.removeItem('number');
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, number } = this.state;
    return (
      <div className={css.container}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <label className={css.label}>
            Name:
            <input
              className={css.login}
              type="text"
              placeholder="Enter name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </label>

          <label className={css.label}>
            Number:
            <input
              className={css.login}
              type="tel"
              placeholder="Enter number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              name="number"
              value={number}
              onChange={this.handleChange}
            />
          </label>

          <button className={css.button} type="submit">
            Add Contact
          </button>
        </form>
      </div>
    );
  }
}

export default ContactForm;
