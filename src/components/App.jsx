import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import css from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  saveStateToLocalStorage = () => {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    localStorage.setItem('filter', this.state.filter);
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    const storedFilter = localStorage.getItem('filter');

    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
    if (storedFilter) {
      this.setState({ filter: storedFilter });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.contacts !== this.state.contacts ||
      prevState.filter !== this.state.filter
    ) {
      this.saveStateToLocalStorage();
    }
  }

  handleAddContact = newContact => {
    const { contacts } = this.state;

    const isExistingNumber = contacts.some(
      contact => contact.number === newContact.number
    );

    if (isExistingNumber) {
      alert('Ten numer już istnieje!');
    } else {
      const contactWithId = { ...newContact, id: nanoid() };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contactWithId],
      }));
    }
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilterChange = filter => {
    this.setState({ filter });
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className={css.cointener}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleAddContact} />

        <h2>Contacts</h2>
        <Filter filter={filter} onFilterChange={this.handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}

export default App;
