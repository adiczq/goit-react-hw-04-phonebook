import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import css from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const saveStateToLocalStorage = () => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    localStorage.setItem('filter', filter);
  };

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    const storedFilter = localStorage.getItem('filter');

    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
    if (storedFilter) {
      setFilter(storedFilter);
    }
  }, []);

  useEffect(() => {
    saveStateToLocalStorage();
  }, [contacts, filter]);

  const handleAddContact = newContact => {
    const isExistingNumber = contacts.some(
      contact => contact.number === newContact.number
    );

    if (isExistingNumber) {
      alert('Ten numer już istnieje!');
    } else {
      const contactWithId = { ...newContact, id: nanoid() };
      setContacts(prevContacts => [...prevContacts, contactWithId]);
    }
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleFilterChange = filter => {
    setFilter(filter);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
